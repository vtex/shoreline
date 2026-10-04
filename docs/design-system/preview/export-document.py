"""Build native HTML paste segments; images are inserted separately in Google Docs."""
import html
import json
import posixpath
import re
from pathlib import Path

root = Path(__file__).resolve().parents[3]
md = (root / 'docs/design-system/proposta.md').read_text()
base = 'https://github.com/vtex/shoreline/blob/feat/horizon-theme-rfc/'
body_style = 'font-family:Arial;font-size:11pt;color:#666666;line-height:115%'

def inline(value):
    value = html.escape(value)
    value = re.sub(r'`([^`]+)`', r'<code style="font-family:Courier New;font-size:10pt">\1</code>', value)
    def link(match):
        href = html.unescape(match[2])
        if not href.startswith('http'):
            href = base + posixpath.normpath('docs/design-system/' + href)
        return '<a style="color:#1155cc;text-decoration:underline" href="' + html.escape(href, quote=True) + '">' + match[1] + '</a>'
    value = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link, value)
    value = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', value)
    return re.sub(r'\*([^*]+)\*', r'<i>\1</i>', value)

def convert(part):
    result = []
    lines = part.strip().splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        i += 1
        if not line.strip():
            continue
        if line.startswith('```'):
            code = []
            while i < len(lines) and not lines[i].startswith('```'):
                code.append(lines[i])
                i += 1
            i += 1
            result.append('<pre style="font-family:Courier New;font-size:9pt;line-height:115%;color:#434343;background:#f3f3f3;padding:8px">' + html.escape('\n'.join(code)) + '</pre>')
            continue
        heading = re.match(r'^(#{1,3}) (.*)', line)
        if heading:
            level = len(heading[1])
            size = {1:24, 2:18, 3:14}[level]
            color = {1: '#f71963', 2: '#f51963', 3: '#434343'}[level]
            font = 'Arial'
            margin = {1: '10pt 0 10pt', 2: '18pt 0 10pt', 3: '16pt 0 4pt'}[level]
            result.append(f'<h{level} style="font-family:{font};font-size:{size}pt;font-weight:bold;color:{color};line-height:115%;margin:{margin}">' + inline(heading[2]) + f'</h{level}>')
            continue
        if line.startswith('|'):
            rows = [line]
            while i < len(lines) and lines[i].startswith('|'):
                rows.append(lines[i])
                i += 1
            metadata = rows[0].startswith('| Criada em')
            result.append('<table style="border-collapse:collapse;width:624px;font-family:Arial;font-size:' + ('9' if metadata else '10') + 'pt;line-height:115%;color:#666666">')
            for n, row in enumerate(rows):
                if re.match(r'^\|[ :|\-]+$', row):
                    continue
                result.append('<tr>')
                for col, cell in enumerate(row.strip('|').split('|')):
                    style = 'border:1px solid ' + ('#000000' if metadata else '#cccccc') + ';padding:5pt;vertical-align:top;'
                    if metadata:
                        style += 'font-weight:bold;' if col % 2 == 0 else 'color:#142032;'
                        if n == 0 and col == 3:
                            style += 'background-color:#f9cb9c;'
                    elif n == 0:
                        style += 'background-color:#f3f3f3;font-weight:bold;'
                    result.append('<td style="' + style + '">' + inline(cell.strip()) + '</td>')
                result.append('</tr>')
            result.append('</table>')
            if metadata:
                result.append('<p style="border-bottom:1px solid #cccccc;margin:10pt 0"></p>')
            continue
        if line.startswith('- ') or re.match(r'^\d+\. ', line):
            ordered = bool(re.match(r'^\d+\. ', line))
            tag = 'ol' if ordered else 'ul'
            result.append('<' + tag + ' style="' + body_style + '">')
            while True:
                result.append('<li style="margin:0 0 10pt">' + inline(re.sub(r'^(?:- |\d+\. )', '', line)) + '</li>')
                if i >= len(lines) or not (re.match(r'^\d+\. ', lines[i]) if ordered else lines[i].startswith('- ')):
                    break
                line = lines[i]
                i += 1
            result.append('</' + tag + '>')
            continue
        result.append('<p style="' + body_style + ';margin:0 0 10pt">' + inline(line) + '</p>')
    return '<html><body><div style="' + body_style + '">' + ''.join(result) + '</div></body></html>'

parts = re.split(r'^!\[[^\]]*\]\([^\n]+\)\s*$', md, flags=re.M)
assert len(parts) == 3
output = root / 'artifacts/horizon-rfc-v2'
output.mkdir(parents=True, exist_ok=True)
segments = [{'html': convert(part), 'text': part.strip()} for part in parts]
(output / 'google-doc-segments.json').write_text(json.dumps(segments, ensure_ascii=False))
print(f'{len(md.split())} words; {len(segments)} segments; 2 native images')
