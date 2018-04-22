### postcss-path-replace

<p>

<a href="https://www.npmjs.com/package/postcss-path-replace"><img src="https://img.shields.io/npm/dm/postcss-path-replace.svg?style=flat" alt="npm"></a>
<a href="https://www.npmjs.com/package/postcss-path-replace"><img src="https://img.shields.io/npm/l/postcss-path-replace.svg" alt="npm"></a>
</p>




#### usage

this plugin can replace the css resource's url. for example:

use this option
```js
{
  "postcss-path-replace" : {
    publicPath: "http://static.example.com",
    matched: "/static",
    mode: "append"
  }
}
```

before css:
```css
div {
  background: url(/static/img/header.png)
}
```

after css:
```css
div {
  background: url(http://static.example.com/static/img/header.png)
}
```

If the mode option is `replace`, the output css will be:
```css
div {
  background: url(http://static.example.com/img/header.png)
}
```

#### OPTIONS

##### publicPath `string`

The plugin will use `publicPath` to replace the matched path, default is `''`

##### matched `string | RegExp`

The matched path, it can be a RegExp:

options:
```js
{
  "postcss-path-replace" : {
    publicPath: '/static/module',
    mode: 'replace',
    matched: /\/static\/module-\d/g
  }
}
```

before css:
```css
div { background: url("/static/module-1/header.png") }
```

after css:
```css
div { background: url("/static/module/header.png") }
```

##### exec `function`

The custom excute function, it's the second argument of `String.prototype.replace`

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

before css:
```css
div { background: url("/static/module-1/header.png") }
```

after css:
```css
div { background: url("/static/module-2/header.png") }
```

#### LISENCE

MIT