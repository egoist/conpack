# @conpack/babel

## Install

```bash
yarn add @conpack/babel
```

## Usage

```js
const Conpack = require('conpack')
const babel = require('@conpack/babel')

const config = new Conpack()
babel(config, options)

module.exports = config.toConfig()
```

## API

### options

#### options.babelLoaderOptions

Type: `any`<br>
Default: `undefined`

Options for `babel-loader`.

## License

MIT &copy; [EGOIST](https://github.com/egoist)
