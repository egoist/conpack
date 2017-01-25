# conpack

[![NPM version](https://img.shields.io/npm/v/conpack.svg?style=flat)](https://npmjs.com/package/conpack) [![NPM downloads](https://img.shields.io/npm/dm/conpack.svg?style=flat)](https://npmjs.com/package/conpack) [![Build Status](https://img.shields.io/circleci/project/egoist/conpack/master.svg?style=flat)](https://circleci.com/gh/egoist/conpack) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

⚠ This module is still at **early stage**.

```bash
yarn add conpack --dev
```

## Usage

```js
// webpack.config.js
const conpack = require('conpack')

const config = conpack()
// you can also give an initial webpack config
// conpack(webpackConfig)

// .css or /\.css$/
config.loader('.css', rule => {
  rule.loader = 'style-loader!css-loader!postcss-loader'
  return rule
})

config.plugin('html', new HtmlWebpackPlugin({title: 'old'}))
// change the html plugin by id
config.plugin('html', new HtmlWebpackPlugin({title: 'new'}))

module.exports = config.webpackConfig
```

## API

### .loader(extension, handler)

#### extension

Type: `string` `RegExp`

Something like `.css` or `/\.css$/`

#### handler(rule)

##### rule

Type: `object`<br>
Default: `{test}`

Matched rule by given `extension`, you can modify it and return the updated rule. If it does not exist, the new rule will be appended.

### .plugin(id, plugin)

#### id

Type: `string`

The id for the plugin to be added.

#### plugin

Type: `object`

The webpack plugin instance, for example: `new HtmlWebpackPlugin()`

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
