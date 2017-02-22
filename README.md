# conpack

[![NPM version](https://img.shields.io/npm/v/conpack.svg?style=flat)](https://npmjs.com/package/conpack) [![NPM downloads](https://img.shields.io/npm/dm/conpack.svg?style=flat)](https://npmjs.com/package/conpack) [![Build Status](https://img.shields.io/circleci/project/egoist/conpack/master.svg?style=flat)](https://circleci.com/gh/egoist/conpack) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

⚠ This module is still at **early stage**.

```bash
yarn add conpack --dev
```

## Usage

In your `webpack.config.js`:

```js
const config = requrie('conpack')

config
  .entry('client')
    .add('./src/index.js')
    .end()
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
