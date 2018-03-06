
# conpack

[![NPM version](https://img.shields.io/npm/v/conpack.svg?style=flat)](https://npmjs.com/package/conpack) [![NPM downloads](https://img.shields.io/npm/dm/conpack.svg?style=flat)](https://npmjs.com/package/conpack) [![CircleCI](https://circleci.com/gh/egoist/conpack/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/conpack/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

Manage `rules` and `plugins` in webpack config like a boss.

<details><summary>Use case</summary><br>

Imagine friend A writes a package called `create-babel-webpack-config` that adds `babel-loader` to webpack config:

```js
module.exports = () => {
  return {
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react-app'] }
        }]
      }]
    }
  }
}
```

Then friend B wants to reuse this package but with some tweaks to use `buble-loader` instead:

```js
// webpack.config.js
const createBabelWebpackConfig = require('create-babel-webpack-config')

const webpackConfig = createBabelWebpackConfig()

webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
  if (rule.test.toString() === '/\\.jsx?$/') {
    rule.use[0].loader = 'buble-loader'
    rule.use[0].options = { target: { node: 6 } }
  }
  return rule
})

module.exports = webpackConfig
```

__THIS IS OBVIOUSLY UGLY!__

Finally friend C shows friend A the power of `conpack`, letting him rewrite `create-babel-webpack-config` to as follows:

```js
const Conpack = require('conpack')

module.exports = () => {
  const conpack = new Conpack()
  const jsRule = conpack.rules.add('js', {
    test: /\.jsx?$/
  })
  jsRule.loaders.add('babel', {
    loader: 'babel-loader',
    options: {
      presets: ['react-app']
    }
  })
  return conpack
}
```

For friend B, he can find and modify the rules with confidence:

```js
// webpack.config.js
const createBabelWebpackConfig = require('create-babel-webpack-config')

const conpack = createBabelWebpackConfig()

const jsRule = conpack.rules.get('js')
jsRule.loaders.replace('babel', 'buble', {
  loader: 'buble-loader',
  options: {
    target: { node: 6 }
  }
})

module.exports = conpack.toConfig()
```
</details>

## Install

```bash
yarn add conpack
```

<details><summary>Example</summary><br>

```js
// webpack.config.js
const Conpack = require('conpack')

const conpack = new Conpack()

// Add a rule
const jsRule = conpack.rules.add('js', {
  test: /\.jsx?$/
})
jsRule.loaders.add('babel', {
  loader: 'babel-loader',
  options: {}
})

// Change loader later by name
jsRule.loaders.replace('babel', 'buble', {
  loader: 'buble-loader',
  options: {}
})

// Add a plugin
conpack.plugins.add('uglify', webpack.optimize.UglifyJsPlugin, [
  {/* options */}
])
// Remove a plugin
conpack.plugins.remove('uglify')

conpack.config = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  mode: process.env.NODE_ENV || 'development'
}

module.exports = conpack.toConfig()
// Alternatively
module.exports = {
  ...conpack.config,
  module: {
    rules: conpack.rules.toArray()
  },
  plugins: conpack.plugins.toArray()
}
```
</details>

## Guide

### General options

For general options (other than `module.rules` and `plugins`).

Note that following methods support dot-nested path as they're using `lodash.get` `lodash.set` `lodash.unset` under the hood.

#### Getting value

```js
conpack.get('resolve.modules')
```

#### Setting value

```js
conpack.set('resolve.alias.foo$', 'foo-module')
// { resolve: { alias: { foo$: 'foo-module' } } }
```

#### Delete value

```js
conpack.delete('resolve.alias.foo$')
```

#### Update value

```js
conpack.update('output.path', currentPath => currentPath + '/foo')
```

#### Append value

```js
conpack.append('entry.client', './foo.js')
```

#### Prepend value

```js
conpack.prepend('entry.client', 'webpack/hot/client')
```

### Rules

#### Add a rule

```js
const rule = conpack.rules.add('rule-name', {
  test: /\.js$/,
  // ...options (excluding `use`)
})
// =>
// {
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         // ...options
//       }
//     ]
//   }
// }
```

#### Prepend a rule

```js
conpack.rules.prepend('rule-name', options)
```

#### Get a rule

```js
conpack.rules.get('rule-name')
```

#### Update a rule

```js
// Always got the rule
const rule = conpack.rules.get('rule-name')
rule.update(options => {
  options.test = /\.ext$/
  return options
})

// Or update a rule by name directly
conpack.rules.update('rule-name', options => newOptions)
```

#### Delete a rule

```js
conpack.rules.delete('rule-name')
```

#### Replace a rule

```js
conpack.rules.replace('rule-name-to-replace', 'new-rule-name', newOptions)
```

#### Check if a rule exists

```js
conpack.rules.has('rule-name')
```

### Loaders

Loader belong to a rule. 

The API `rule.loaders` is pretty much the same as `conpack.rules`.

### Plugins

The API `conpack.plugins` is pretty much the same as `conpack.rule`, except for:

- `conpack.plugins.add(name, Plugin, options)`: The second argument is the plugin constructor, the third one is its options as an array.
- `conpack.plugins.update(name, Plugin, options)`: Update plugin by given `name`.
- `conpack.plugins.updateOptions(name, options)`: Update plugin options by given `name`.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**conpack** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/conpack/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
