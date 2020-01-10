var assert = require('assert')
var postcss = require('postcss')
var pathReplace = require('../');

function run(input, output, opts) {
  return postcss([pathReplace(opts)]).process(input, { from: undefined })
    .then(result => {
      assert.equal(result.css, output)
      assert.equal(result.warnings().length, 0)
      return result
    })
}

it("Replaces background's path with no quotation mark", () => {
  return run(
    'div { background: url(/static/img/header.png) }',
    'div { background: url(http://static.example.com/static/img/header.png) }',
    {
      publicPath: 'http://static.example.com',
      mode: 'append',
      matched: '/static'
    }
  )
})

it("Replaces background's path with quotation mark", () => {
  return run(
    'div { background: url("/static/img/header.png") }',
    'div { background: url("http://static.example.com/static/img/header.png") }',
    {
      publicPath: 'http://static.example.com',
      mode: 'append',
      matched: '/static'
    }
  )
})

it("Replaces background's path with mode-replace", () => {
  return run(
    'div { background: url("/static/img/header.png") }',
    'div { background: url("http://static.example.com/img/header.png") }',
    {
      publicPath: 'http://static.example.com',
      mode: 'replace',
      matched: '/static'
    }
  )
})

it("The matched path is a RegExp", () => {
  return run(
    'div { background: url("/static/module-1/header.png") }',
    'div { background: url("http://static.example.com/static/module/header.png") }',
    {
      publicPath: 'http://static.example.com/static/module',
      mode: 'replace',
      matched: /\/static\/module-\d/g
    }
  )
})

it("Unknown mode", () => {
  return run(
    'div { background: url("/static/img/header.png") }',
    'div { background: url("http://static.example.com/img/header.png") }',
    {
      publicPath: 'http://static.example.com',
      mode: 'replacexx',
      matched: '/static'
    }
  )
})

it("No resource link", () => {
  return run(
    'div { background: #FFF }',
    'div { background: #FFF }',
    {
      publicPath: 'http://static.example.com',
      mode: 'replace',
      matched: '/static'
    }
  )
})

it("Use custom execute function", () => {
  return run(
    'div { background: url("/static/module-1/header.png") }',
    'div { background: url("/static/module-2/header.png") }',
    {
      matched: /\/static\/module-\d/g,
      exec: function (value) {
        const moduleIndex = value.split('-')[1]
        return value.split('-')[0] + '-' + (Number(moduleIndex) + 1)
      }
    }
  )
})

// fix: #1
it("Regexp escape", () => {
  return run(
    'div { background: url("base64:image/png;/9tT9//oTd9/f3/wK8v7+DH/") }',
    'div { background: url("base64:image/png;/9tT9//oTd9/f3/wK8v7+DH/") }',
    {
      publicPath: "../",
      matched: "../../",
      mode: "replace"
    }
  )
})
