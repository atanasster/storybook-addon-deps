import React from 'react';
import addons from '@storybook/addons';
import { SELECT_STORY } from '@storybook/core-events';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { Chart } from 'react-google-charts';
import { getDependencyMap } from 'storybook-dep-webpack-plugin/runtime/main';
import { getComponentStories } from '../shared/utils';

export interface IChartChartComponentUsageProps {
  options?: object,
  labels?: string[],
}


export const ChartComponentUsage: React.FunctionComponent<IChartChartComponentUsageProps> = ({ options, labels, ...rest }) => (
  <DocsContext.Consumer>
    {context => {
      const map = getDependencyMap();
      const { mapper } = map;
      const modules = Object.keys(mapper).filter(key => mapper[key].name)
        .map(key => ({ key, ...mapper[key], stories: getComponentStories(mapper[key].name, context.storyStore)}))
        .filter(m => m.stories && m.stories.length > 0);
      const usage = modules.reduce((acc, module) => {
        const componentName = module.name;
        const usage = modules.filter(m => (m.dependencies && m.dependencies.includes(module['key'])));
        if (acc[componentName]) {
          return {...acc, [componentName]: [...acc[componentName], ...usage]}
        }
        return {...acc, [componentName]: usage}
      },{})
      const data = [
        ['All', null, 0, 0],
      ];
      const numComponents = Object.keys(usage).length;
      if (numComponents) {
        Object.keys(usage).forEach(key => {
          const dep = usage[key];
          if (dep.length) {
            const name = `${key} (${usage[key].length})`;
            data.push([name, 'All', 0, 0])
            dep.forEach(module => {
              data.push([`${module.name} / ${key} (${usage[module.name].length})`, name, usage[module.name].length * 5 + 1, Object.keys(usage).indexOf(module.name)])
            })
          }
        });
      }  
      return (
        <Chart
          chartType="TreeMap"
          data={[
            labels || [
              'Component',
              'Dependent',
              'Used by',
              'Avg'
            ],
            ...data
          ]}
          options={options}
          {...rest}
          chartEvents={[
            {
              eventName: 'select',
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart()
                const selection = chart.getSelection()
                const dataTable = chartWrapper.getDataTable();
                if (dataTable.getValue(selection[0].row, 2) !== 0) {
                  const component = Object.keys(usage)[dataTable.getValue(selection[0].row, 3) as number];
                  const stories = getComponentStories(component, context.storyStore);
                  if (stories && stories.length > 0) {
                    addons.getChannel().emit(SELECT_STORY, context.storyStore._data[stories[0]])
                  }
               }
              },
            },
          ]}

        />
      );
    }}
  </DocsContext.Consumer>
);

