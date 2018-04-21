var postcss = require('postcss');

module.exports = postcss.plugin('postcss-path-replace', (options) => {
  var publicPath = options.publicPath || ''
  var matched = options.matched
  var mode = options.mode || 'replace'
  var exec = options.exec
  
  if (typeof matched === 'string') {
    matched = new RegExp(matched, 'g')
  }
  return root => {
    root.walkDecls(decl => {
      if (/url\(['"]?.*?['"]?\)/.test(decl.value)) {
        decl.value = decl.value.replace(matched, function () {
          var args = [].slice.call(arguments)
          if (exec && typeof exec === 'function') {
            return exec.apply(null, args)
          }
          if (mode === 'replace') {
            return publicPath
          }

          if (mode === 'append') {
            return publicPath + args[0]
          }
        })
      }
    })
  }
})
