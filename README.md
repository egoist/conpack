# conpack

[![NPM version](https://img.shields.io/npm/v/conpack.svg?style=flat)](https://npmjs.com/package/conpack) [![NPM downloads](https://img.shields.io/npm/dm/conpack.svg?style=flat)](https://npmjs.com/package/conpack) [![Build Status](https://img.shields.io/circleci/project/egoist/conpack/master.svg?style=flat)](https://circleci.com/gh/egoist/conpack) [![codecov](https://codecov.io/gh/egoist/conpack/branch/master/graph/badge.svg)](https://codecov.io/gh/egoist/conpack)
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## How does this look like?

```js
module.exports = config
  .entry('client')
    .add('./src/index.js')
    .end()
  .toConfig()
```

## Why

You may wonder why we need an abstraction of the webpack API, here's the reason:

> "Finally, webpack config done right. (...) Webpack clearly wants to stay low-level. So it makes total sense to outsource configuring it to well designed blocks instead of copy-paste." 
>
> —— [Dan Abramov](https://github.com/gaearon) via [Twitter](https://twitter.com/dan_abramov/status/806249934399881216)

But that is towards [webpack-blocks](https://github.com/andywer/webpack-blocks) which uses [webpack-merge](https://github.com/survivejs/webpack-merge) under the hood, but still, [webpack-merge has its downsides](https://github.com/andywer/webpack-blocks/issues/34):

- it's hard to update existing loaders
- it's hard to update existing plugins
- it's hard to update the options of exising loaders and plugins
- etc.

The solution definitely needs to be a higher level API than webpack-merge.

## Install

```bash
yarn add conpack --dev
```

## Usage

In your `webpack.config.js`:

```js
const config = require('conpack')

config
  .entry('client')
    .add('./src/index.js')
    .end() // You need to invoke `.end` to return to parent chain
  .output
    .filename('[name].js')
    .path(process.cwd())
    .end()
  .module
    .rule('compile:js')
      .test(/\.jsx?$/)
      .loader('babel', 'babel-loader', {
        presets: ['es2015']
      })
      .end()
    .end()

// you can lazy-change the loader by namespace `babel`
config
  .module
    .rule('compile:js')
      .loader('babel', 'babel-loader', {
        presets: ['latest']
      })
      .end()
    .end()

module.exports = config.toConfig()
```

For more usages please refer to [tests](/tests), docs are coming soon.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**conpack** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/conpack/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
