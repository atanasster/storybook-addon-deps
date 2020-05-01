import React from 'react';
import addons from '@storybook/addons';
import { SELECT_STORY } from '@storybook/core-events';
import { StoryStore } from '@storybook/client-api';
import { Chart } from 'react-google-charts';
import { DocsContext } from '../shared/DocsBlocks';
import { getComponentName, getStoreStories } from '../shared/utils';

export interface IChartStoriesPerComponentProps {
  options?: object,
  labels?: string[],
}

const storiesByComponent = (storyStore: StoryStore) => {
  const store = getStoreStories(storyStore);
  return Object.keys(store).reduce((acc, key) => {
    const story = store[key];
    const componentName = getComponentName(story.parameters.component) || 'N/A';
    if (acc[componentName]) {
      return {...acc, [componentName]: [...acc[componentName], story] };
    };
    return {...acc, [componentName]: [story] };
  }, {});
}

export const ChartStoriesPerComponent: React.FunctionComponent<IChartStoriesPerComponentProps> = ({ options, labels, ...rest }) => (
  <DocsContext.Consumer>
    {context => {
      const stats = storiesByComponent(context.storyStore);
      const statsArr = Object.keys(stats).map(key => ([key, stats[key].length]))
        .sort((a, b) =>  (b[1] - a[1]));
      const chartLabels = labels || ['Component', 'Stories'];
      return (
        <Chart
          chartType="PieChart"
          {...rest}
          options={options}
          data={[
            chartLabels,
            ...statsArr
          ]}
          chartEvents={[
            {
              eventName: 'select',
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart()
                const selection = chart.getSelection()
                if (selection.length === 1) {
                  const story = stats[statsArr[selection[0].row][0]][0];
                  addons.getChannel().emit(SELECT_STORY, story)
                }
              },
            },
          ]}
        />
      );
    }}
  </DocsContext.Consumer>
);

