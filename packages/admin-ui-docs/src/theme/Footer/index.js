/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';
import ThemedImage from '@theme/ThemedImage';

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      {...(href
        ? {
          href: prependBaseUrlToHref ? normalizedHref : href,
        }
        : {
          to: toUrl,
        })}
      {...props}>
      {label}
    </Link>
  );
}

function FooterLogo({ sources, alt, width, height }) {
  return (
    <ThemedImage
      className={styles.logo}
      alt={alt}
      sources={sources}
      width={width}
      height={height}
    />
  );
}

function MultiColumnLinks({ links }) {
  return (
    <>
      {links.map((linkItem, i) => (
        <div key={i}>
          <ul className={styles.links}>
            {linkItem.items.map((item) => (
              <li key={item.href || item.to}>
                <FooterLink {...item} className={styles.link} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function Footer() {
  const { footer } = useThemeConfig();
  const { links = [], logo = {} } = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  return (
    <footer className={styles.footer}>
      <div className={clsx(
        styles.container,
        {
          [styles.containerWithoutLinks]: links.length === 0,
        }
      )}>
        <div className={styles.leftContent}>
          <FooterLogo
            alt={logo.alt}
            sources={sources}
            width={logo.width}
            height={logo.height}
          />
          <span className={styles.name}>
            Admin UI
          </span>
        </div>
        <div className={styles.rightContent}>
          <div>
            {links.length > 0 && (
              <div className={styles.linksContainer}>
                <MultiColumnLinks links={links} />
              </div>
            )}
          </div>
          <div className={styles.message}>
            Have questions? Found a bug? <Link to="/teams/contributing/contact-us">Contact us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
