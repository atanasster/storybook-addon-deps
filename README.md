# storybook-addon-deps

A storybook addon to add a dependencies tree exporer tab.<br />
Works in conjunction with [storybook-dep-webpack-plugin](https://github.com/atanasster/storybook-dep-webpack-plugin/)

![Dependencies plugin](./doc/storybook_dependencies.gif)

## Live demo
[grommet-controls](https://atanasster.github.io/grommet-controls/?path=/deps/controls-controls-avatar--main)

## Install and configure `storybook-dep-webpack-plugin`
[storybook-dep-webpack-plugin](https://github.com/atanasster/storybook-dep-webpack-plugin/blob/master/README.md)


## Installation
```sh
npm i -D storybook-addon-deps
```

## Configuration

in the `addons.js` file in your storybook config, register `storybook-addon-deps`:

```js
import 'storybook-addon-deps/register';
```

## Usage
In your storybook config.js, define some global parameters to exchange the data collected by the `storybook-dep-webpack-plugin`


```javascript
import { configure, addDecorator, addParameters } from '@storybook/react';
import { dependenciesMap } from 'storybook-dep-webpack-plugin/runtime/main';

addParameters({
 dependencies: {
    mapper: dependenciesMap,
    storyDependencies: true,
  }
});
```
