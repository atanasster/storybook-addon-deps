/* eslint-disable import/no-extraneous-dependencies */
// This is allows us to test whether the link works via the actions addon
import React, { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';

const fireClickAction = action('onLinkClick');

interface StoryLinkWrapper {
  // eslint-disable-next-line react/forbid-prop-types
  children: any,
  className?: string,
  href?: string,
  onClick?: MouseEventHandler<HTMLAnchorElement>,
  to?: string,
};

export function StoryLinkWrapper({ children, className, href, onClick, to, ...rest }: StoryLinkWrapper) {
  const modifiedOnClick = event => {
    event.preventDefault();
    onClick();
    fireClickAction(href || to);
  };

  return (
    <a className={className} href={href || to} onClick={modifiedOnClick} {...rest}>
      {children}
    </a>
  );
}


StoryLinkWrapper.defaultProps = {
  className: '',
  href: null,
  onClick: () => {},
  to: null,
};