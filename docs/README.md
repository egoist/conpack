# Conpack

Webpack config manager.

## API

### .entry(name)

Create a webpack entry with emtpy array if it doesn't exist.

```js
config
  .entry('client')

// The webpack config:
{
  entry: {
    client: []
  }
}
```

#### .add(path)

A path to specific entry.

```js
config
  .entry('client')
  .add('index.js')

// The webpack config:
{
  entry: {
    client: ['index.js']
  }
}
```

#### .prepend(path)

Add a path to the beginning of specific entry.

```js
config
  .entry('client')
  .add('index.js')
  .prepend('other.js')

// The webpack config:
{
  entry: {
    client: ['other.js', 'index.js']
  }
}
```

#### .delete(path)

Remove a path from specific entry.

```js
config
  .entry('client')
  .add('index.js')
  .add('other.js')
  .delete('index.js')

// The webpack config:
{
  entry: {
    client: ['other.js']
  }
}
```
