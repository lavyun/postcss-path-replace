# postcss-path-replace

![Travis (.org)](https://img.shields.io/travis/lavyun/postcss-path-replace)
[![Coverage Status](https://coveralls.io/repos/github/lavyun/postcss-path-replace/badge.svg?branch=master)](https://coveralls.io/github/lavyun/postcss-path-replace?branch=master)
![npm](https://img.shields.io/npm/dm/postcss-path-replace)
![node](https://img.shields.io/node/v/postcss-path-replace)
![NPM](https://img.shields.io/npm/l/postcss-path-replace)


## usage

This plugin can replace the resource's url in your css:

```js
{
  "postcss-path-replace" : {
    publicPath: "http://static.example.com",
    matched: "/static",
    mode: "append"
  }
}
```

before:

```css
div {
  background: url(/static/img/header.png)
}
```

after:

```css
div {
  background: url(http://static.example.com/static/img/header.png)
}
```

If mode was `replace`, the output css will be:

```css
div {
  background: url(http://static.example.com/img/header.png)
}
```

## OPTIONS

### publicPath `string`

The plugin will use `publicPath` to replace the matched path, default is `''`

### matched `string | RegExp`

The matched path, it can be a RegExp:

```js
{
  "postcss-path-replace" : {
    publicPath: '/static/module',
    mode: 'replace',
    matched: /\/static\/module-\d/g
  }
}
```

before:
```css
div { background: url("/static/module-1/header.png") }
```

after:
```css
div { background: url("/static/module/header.png") }
```

### exec `function`

The custom execute function, it's the second argument of [String.prototype.replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#%E6%8C%87%E5%AE%9A%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0)

options:
```js
{
  matched: /\/static\/module-\d/g,
  exec: function (value) {
    const moduleIndex = value.split('-')[1]
    return value.split('-')[0] + '-' + (Number(moduleIndex) + 1)
  }
}
```

before:
```css
div { background: url("/static/module-1/header.png") }
```

after:
```css
div { background: url("/static/module-2/header.png") }
```

## LISENCE

MIT