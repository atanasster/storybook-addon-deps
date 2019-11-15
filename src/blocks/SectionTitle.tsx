import React from 'react';
import { H2 } from '@storybook/components/html';

interface ISectionTitleProps {
  children?: string;
}

export const SectionTitle = ({ children }: ISectionTitleProps) => (
  <H2>{children}</H2>
);