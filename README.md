# storybook-addon-deps

A storybook addon to add a dependencies tree exporer tab.<br />

## Quick start
### 1. Install
```sh
npm i -D storybook-addon-deps
```
### 2. Add preset: `.storybook/main.js`
```js
module.exports = {
  presets: ['storybook-addon-deps/preset', ...]
...
}  
```

### 3. Configure DocsPage `.storybook/preview.js` (was `.storybook/config.js`)
```
import { DocsPage } from 'storybook-addon-deps/blocks';

addParameters({
  docs: { page: DocsPage },
  dependencies: { withStoriesOnly: true, hideEmpty: true }
});
```

# Advanced setup and usage

## DocsPage demo 
[grommet-controls](https://atanasster.github.io/grommet-controls/?path=/docs/controls-controls-avatar--main)

## Usage
In your storybook preview.js(or config.js), define some global parameters to exchange the data collected by the `storybook-dep-webpack-plugin`


```js
import { configure, addDecorator, addParameters } from '@storybook/{yourframework}';

addParameters({
 dependencies: {
    //display only dependencies/dependents that have a story in storybook
    //by default this is false
    withStoriesOnly: true,

    //completely hide a dependency/dependents block if it has no elements
    //by default this is false
    hideEmpty: true,
  }
});
```

## A. Add a documentation block to your DocsPage (optional)
DocsPage is the zero-config default documentation that all stories get out of the box.
You can add a **Dependencies** block to any level to your storybook

**Globally (preview.js/config.js)**

```js
import { DocsPage } from 'storybook-addon-deps/blocks/DocsPage';
addParameters({ docs: { page: DocsPage } });
```

**Component-level (Button.stories.js)**

```js
import { Button } from './Button';
import { DocsPage } from 'storybook-addon-deps/blocks/DocsPage';
export default {
  title: 'Demo/Button',
  component: Button,
  parameters: { docs: { page: DocsPage } },
};
```

**Story-level (Button.stories.js)**

```js
import { Button } from './Button';
import { DocsPage } from 'storybook-addon-deps/blocks/DocsPage';
// export default { ... }
export const basic => () => <Button>Basic</Button>
basic.story = {
  parameters: { docs: { page: DocsPage } }
}
```

## B. Add dependencies and dependents doc blocks to mdx stories (optional)
**Button.stories.mdx**

```jsx
import {
  Story,
  Preview,
  Props,
  Description,
  Meta,
} from '@storybook/addon-docs/blocks';
import { Button } from '@storybook/design-system/dist/components/Button';
import { DependenciesTable, Dependencies, Dependents } from 'storybook-addon-deps/blocks';

<Meta
  title="Design System|Button"
  component={Button}
/>

# Two ways to display blocks - combined into a single table, or separated into two tables

## 1. DependenciesTable - combined dependencies and dependents into one
<DependenciesTable titleDependencies='Dependencies' titleDependents='Dependents' of={Button} />

## 2. Dependencies and Dependents tables

<Dependencies of={Button} />

<Dependents of={Button} />
```

## C. Add a dependencies explorer tab to storybookjs (optional)

## Use the `preset-explorer` preset
```js
module.exports = {
  presets: ['storybook-addon-deps/preset-explorer', ...]
...
}  
```

# Project analysis
The charts used are [Google Charts](https://react-google-charts.com) and all their properties are applicable. Detailed information on configuration options is available from Google documentation, for example [Pie Chart](https://developers.google.com/chart/interactive/docs/gallery/piechart#configuration-options) options.

```
import { Meta } from '@storybook/addon-docs/blocks';
import { ChartComponentUsage, ChartStoriesPerComponent } from 'storybook-addon-deps/blocks';
  
<Meta title="About|Dashboard" />
<ChartStoriesPerComponent />
<ChartComponentUsage />
```

## Stories per component
```
import { Heading } from '@storybook/addon-docs/blocks';
import { ChartStoriesPerComponent } from 'storybook-addon-deps/blocks';
<Heading>Stories per component</Heading>
<ChartStoriesPerComponent
  height='500px'
  options={{
    sliceVisibilityThreshold: 0.04,
    pieSliceText: 'value',
    s3D: true,
    pieHole: 0.7,
  }}
/>
```

## Components by usage

Displays how many times each component is used by other components.
```
import { Heading } from '@storybook/addon-docs/blocks';
import { ChartStoriesPerComponent } from 'storybook-addon-deps/blocks';
<Heading>Components usage</Heading>
<ChartComponentUsage
  height='500px'
  options={{
    minColor: '#009688',
    midColor: '#f7f7f7',
    maxColor: '#ee8100',
  }}
/>
```

# Other frameworks
## web-components
![web components](./doc/web-components.gif)

## angular
![angular](./doc/angular.gif)

## vue
![vue](./doc/vue.gif)


# Options
a set of options can be passed down to the `storybook-dep-webpack-plugin`

**filter** - a RegExp or function to select the stories.<br/>
example: 
```
module.exports = {
  presets: [
    { 
      name: 'storybook-addon-deps/preset-explorer', 
      options: {
        filter: (resource) => {
        return /\.(stories|story)\.[tj]sx?$/.test(resource) && resource.indexOf("Avatar") > -1;
      }
    }
  ]
...

**exclude** - a RegExp for the modules to exclude.<br/>
example: 
```
module.exports = {
  presets: [
    { 
      name: 'storybook-addon-deps/preset-explorer', 
      options: {
        //by default @storybook modules are also excluded
        exclude: /^@babel/,
      }
    }
  ]

```

**maxLevels** - How many levels deep to follow the dependencies.<br/>
example: 
```
module.exports = {
  presets: [
    { 
      name: 'storybook-addon-deps/preset-explorer', 
      options: {
        maxLevels: 10,
      }
    }
  ]

```

**pickProperties** - An array of the props to pick from the module webpack data.<br/>
example: 
```
module.exports = {
  presets: [
    { 
      name: 'storybook-addon-deps/preset-explorer', 
      options: {
        pickProperties: ['id', 'name', 'request'],
      }
    }
  ]

```

**pickModuleProperties** - An array of the props to pick from the module.module webpack data.<br/>
example: 
```
module.exports = {
  presets: [
    { 
      name: 'storybook-addon-deps/preset-explorer', 
      options: {
        pickModuleProperties: [],
      }
    }
  ]

```