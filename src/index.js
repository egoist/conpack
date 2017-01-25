import isEqualRegex from 'is-equal-regex'
import dotProp from 'dot-prop'

export default function (config) {
  config = {...config}

  const plugins = {}
  if (config.plugins) {
    config.plugins.forEach((plugin, index) => {
      plugins[index] = plugin
    })
  }

  function loader(ext, handler) {
    let test
    if (ext instanceof RegExp) {
      test = ext
    } else if (ext.charAt(0) === '.') {
      test = new RegExp(`${ext}$`.replace(/\./g, '\\$&'))
    } else {
      test = getExtensionByType(ext)
    }
    const oldRules = dotProp.get(config, 'module.rules', [])
    const rule = findRuleByTest(oldRules, test) || {test}
    const newRule = typeof handler === 'function' ?
      handler(rule) :
      {...rule, ...handler}
    const newRules = replaceRuleByTest(oldRules, test, newRule)
    dotProp.set(config, 'module.rules', newRules)
  }

  function plugin(id, pluginInstance) {
    plugins[id] = pluginInstance
    config.plugins = Object.keys(plugins).map(id => plugins[id])
  }

  return {
    loader,
    plugin,
    get webpackConfig() {
      return config
    }
  }
}

function findRuleByTest(rules, test) {
  return rules.filter(rule => {
    return isEqualRegex(rule.test, test)
  })[0]
}

function replaceRuleByTest(rules, test, newRule) {
  let has
  const newRules = rules.map(rule => {
    if (isEqualRegex(rule.test, test)) {
      has = true
      return newRule
    }
    return rule
  })
  if (has) {
    return newRules
  }
  return rules.concat(newRule)
}

function getExtensionByType(type) {
  const types = {
    css: /\.css$/,
    image: /\.(jpg|png|gif|webp)$/,
    html: /\.html$/,
    jade: /\.(jade|pug)$/,
    vue: /\.vue$/
  }
  return types[type]
}
