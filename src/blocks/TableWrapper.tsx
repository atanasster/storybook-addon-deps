import React from 'react';
import { styled } from '@storybook/theming';
import { TableWrapper as Table } from '@storybook/components';
import { ResetWrapper } from '@storybook/components/dist/esm/typography/DocumentFormatting';

export const DepTable = styled(Table)<{}>(() => ({
  '&&': {
    'th:last-of-type, td:last-of-type': {
      width: '70%',
    },

  },
}));

export const TableWrapper = ({ children }) => (
  <ResetWrapper>
    <DepTable className="docblock-dependenciestable">
      <thead>
        <tr>
          <th>name</th>
          <th>path</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </DepTable>
  </ResetWrapper>
);
