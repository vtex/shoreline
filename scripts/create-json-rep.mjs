import fs from 'fs';
import path from 'path';
import { sync } from 'glob';
import { parse, builtinResolvers, builtinImporters } from 'react-docgen';

class ComponentDocGenerator {
  constructor(options = {}) {
    this.componentsPath = options.componentsPath || './src/components';
    this.outputPath = options.outputPath || './component-docs.json';
    this.extensions = options.extensions || ['.jsx', '.tsx', '.js', '.ts'];
    this.verbose = options.verbose || false;
  }

  async generateDocs() {
    const componentFiles = this.findComponentFiles();
    const docs = {};
    let processedCount = 0;
    let skippedCount = 0;

    console.log(`Found ${componentFiles.length} component files to process...`);

    for (const file of componentFiles) {
      try {
        if (this.verbose) {
          console.log(`Processing: ${file}`);
        }

        // Read the source for both react-docgen and our custom type extraction
        const source = fs.readFileSync(file, 'utf8');
        const extractedTypes = this.extractTypesFromSource(source, file);

        const componentDocs = await this.parseComponent(file);
        if (componentDocs && Array.isArray(componentDocs)) {
          // react-docgen can return multiple components from one file
          componentDocs.forEach((componentDoc, index) => {
            const componentName = componentDoc.displayName ||
              this.getComponentName(file) + (index > 0 ? `_${index}` : '');
            docs[componentName] = this.formatComponentDoc(componentDoc, extractedTypes);
            processedCount++;
          });
        } else if (componentDocs) {
          // Single component
          const componentName = componentDocs.displayName || this.getComponentName(file);
          docs[componentName] = this.formatComponentDoc(componentDocs, extractedTypes);
          processedCount++;
        } else {
          skippedCount++;
          if (this.verbose) {
            console.log(`  - No component found in ${file}`);
          }
        }
      } catch (error) {
        skippedCount++;
        if (this.verbose) {
          console.warn(`  - Failed to parse ${file}: ${error.message}`);
        }
      }
    }

    console.log(`Processed: ${processedCount} components, Skipped: ${skippedCount} files`);
    this.writeDocs(docs);
    return docs;
  }

  findComponentFiles() {
    const patterns = this.extensions.map(ext =>
      `${this.componentsPath}/**/*${ext}`
    );

    const files = patterns.flatMap(pattern => sync(pattern));

    // Filter out common non-component files
    return files.filter(file => {
      const basename = path.basename(file);
      const dirname = path.dirname(file);

      // Skip test files, story files, spec files
      if (basename.match(/\.(test|spec|stories|story)\./)) return false;

      // Skip utility files and type definition files
      if (basename.match(/\.(types?|utils?|constants?|helpers?)\./)) return false;

      // Skip files in __tests__, tests, stories directories
      if (dirname.match(/(tests?|stories?|__tests__|__stories__)$/)) return false;

      // Skip obvious non-component files
      if (basename.startsWith('use-') || basename.startsWith('with-')) return false;
      if (basename.includes('context') || basename.includes('provider') && !basename.includes('tooltip-provider')) return false;

      // Only include files that likely contain components
      return true;
    });
  }

  async parseComponent(filePath) {
    const source = fs.readFileSync(filePath, 'utf8');

    try {
      // Use the new react-docgen v8 API with proper TypeScript support
      const components = parse(source, {
        resolver: builtinResolvers.findExportedComponentDefinitions,
        importer: builtinImporters.fsImporter,
        babelOptions: {
          parserOpts: {
            plugins: ['typescript', 'jsx'],
            strictMode: false
          }
        },
        filename: filePath
      });
      return Array.isArray(components) ? components : [components];
    } catch (error) {
      // If the main resolver fails, try the legacy resolver
      try {
        const components = parse(source, {
          resolver: builtinResolvers.findAllComponentDefinitions,
          importer: builtinImporters.fsImporter,
          babelOptions: {
            parserOpts: {
              plugins: ['typescript', 'jsx']
            }
          },
          filename: filePath
        });
        return Array.isArray(components) ? components : [components];
      } catch (secondError) {
        // If react-docgen fails completely, try to extract basic info manually
        if (this.shouldAttemptFallback(source, filePath)) {
          return this.fallbackParse(source, filePath);
        }

        if (this.verbose) {
          console.log(`  - Parse error: ${secondError.message}`);
        }
        return null;
      }
    }
  }

  shouldAttemptFallback(source, filePath) {
    // Only attempt fallback for files that look like they contain components
    const hasComponentPattern = /export\s+(const|function|class)\s+[A-Z][a-zA-Z0-9]*/.test(source);
    const hasForwardRef = /forwardRef/.test(source);
    const hasExportDefault = /export\s+default/.test(source);
    const isNotJustExport = !/^import[\s\S]*export\s+\{[\s\S]*\}\s*$/.test(source.trim());

    return (hasComponentPattern || hasForwardRef || hasExportDefault) && isNotJustExport;
  }

  extractTypesFromSource(source, filePath) {
    // Enhanced type extraction using regex patterns for common TypeScript patterns
    const types = {};

    // Extract interface or type definitions that might be component props
    const interfaceRegex = /(?:interface|type)\s+(\w+Options|\w+Props)\s*(?:extends[^{]*)?{([^}]+)}/gs;
    let match;

    while ((match = interfaceRegex.exec(source)) !== null) {
      const [, interfaceName, interfaceBody] = match;
      if (interfaceName.includes('Props') || interfaceName.includes('Options')) {
        // Extract properties from the interface body - handle multi-line types
        const propRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*(\w+)(\?)?:\s*([\s\S]*?)(?=\s*\/\*\*|\s*\w+\s*[?:]|\s*})/g;
        let propMatch;

        while ((propMatch = propRegex.exec(interfaceBody)) !== null) {
          const [, comment, propName, optional, propType] = propMatch;

          // Clean up the comment
          const description = comment
            .split('\n')
            .map(line => line.replace(/^\s*\*\s?/, '').trim())
            .filter(line => !line.startsWith('@'))
            .join(' ')
            .trim();

          // Clean up the type - handle multi-line types
          let cleanType = propType
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim()
            .replace(/,$/, ''); // Remove trailing comma

          // Handle union types that span multiple lines
          if (cleanType.includes('|')) {
            // Extract literal string values from union types
            const literalMatches = cleanType.match(/'([^']+)'/g);
            if (literalMatches) {
              cleanType = literalMatches.join(' | ');
            } else {
              // Clean up pipe-separated types
              cleanType = cleanType
                .split('|')
                .map(part => part.trim())
                .filter(part => part && part !== '')
                .join(' | ');
            }
          }

          types[propName] = {
            type: cleanType,
            required: !optional,
            description: description
          };
        }
      }
    }

    return types;
  }

  fallbackParse(source, filePath) {
    // Extract basic component information using regex patterns
    const componentName = this.getComponentName(filePath);

    // Try to extract JSDoc comment
    const jsDocMatch = source.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
    let description = '';

    if (jsDocMatch) {
      description = jsDocMatch[1]
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '').trim())
        .filter(line => !line.startsWith('@'))
        .join(' ')
        .trim();
    }

    return [{
      displayName: componentName,
      description: description,
      props: {}, // Could be enhanced to extract TypeScript interface props
      methods: [],
      composes: [],
      examples: []
    }];
  }

  getComponentName(filePath) {
    return path.basename(filePath, path.extname(filePath));
  }

  formatComponentDoc(componentDoc, extractedTypes = {}) {
    // Clean up description by removing JSDoc tags and formatting
    let description = componentDoc.description || '';
    if (description) {
      description = description
        .replace(/@\w+\s+\w+/g, '') // Remove @status, @example tags
        .replace(/\n@example[\s\S]*$/g, '') // Remove example blocks
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
    }

    return {
      displayName: componentDoc.displayName || 'Unknown',
      description: description,
      props: Object.entries(componentDoc.props || {}).reduce((acc, [propName, propData]) => {
        // Better type extraction
        let propType = 'unknown';
        let required = propData.required || false;
        let propDescription = (propData.description || '').replace(/\s+/g, ' ').trim();

        // Use react-docgen data if available
        if (propData.type) {
          if (propData.type.name) {
            propType = propData.type.name;
          } else if (propData.type.raw) {
            propType = propData.type.raw;
          } else if (propData.type.value) {
            // Handle union types, enums, etc.
            if (Array.isArray(propData.type.value)) {
              propType = propData.type.value.map(v => v.value || v.name || v).join(' | ');
            } else {
              propType = propData.type.value;
            }
          }
        }

        // If react-docgen didn't find good type info, use our extracted types
        if (propType === 'unknown' && extractedTypes[propName]) {
          propType = extractedTypes[propName].type;
          if (!propDescription && extractedTypes[propName].description) {
            propDescription = extractedTypes[propName].description;
          }
          if (extractedTypes[propName].required !== undefined) {
            required = extractedTypes[propName].required;
          }
        }

        // Clean up the type string
        propType = propType.replace(/import\([^)]+\)\./, '').replace(/React\./, '');

        acc[propName] = {
          type: propType,
          required: required,
          description: propDescription,
          defaultValue: propData.defaultValue?.value || undefined
        };
        return acc;
      }, {}),
      methods: componentDoc.methods || [],
      composes: componentDoc.composes || [],
      examples: componentDoc.examples || []
    };
  }

  writeDocs(docs) {
    const outputDir = path.dirname(this.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(this.outputPath, JSON.stringify(docs, null, 2));
    console.log(`Generated documentation for ${Object.keys(docs).length} components`);
    console.log(`Output written to: ${path.resolve(this.outputPath)}`);
  }
}

// Usage
const generator = new ComponentDocGenerator({
  componentsPath: './packages/shoreline/src/components',
  outputPath: './shoreline-components.json',
  verbose: process.argv.includes('--verbose') || process.argv.includes('-v')
});


generator.generateDocs().then(docs => {
  console.log('Documentation generated successfully!');
}).catch(error => {
  console.error('Error generating documentation:', error);
});
