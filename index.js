var postcss = require('postcss')

var pathReplacePlugin = postcss.plugin('postcss-path-replace', pathReplaceProcess)

module.exports = pathReplacePlugin

/**
 * plugin process handler.
 * @param {object} options 
 */
function pathReplaceProcess(options) {
  var publicPath = options.publicPath || ''
  var matched = options.matched
  var mode = options.mode || 'replace'
  var exec = options.exec

  // want a regexp to replace all.
  if (typeof matched === 'string') {
    var escapeMatched = escapeRegExp(matched)
    matched = new RegExp(escapeMatched, 'g')
  }
  return function (root) {
    root.walkDecls(function (decl) {
      if (/url\(['"]?.*?['"]?\)/.test(decl.value)) {
        decl.value = decl.value.replace(matched, function() {
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

          return publicPath
        })
      }
    })
  }
}

/**
 * escape special char, like '.', '/'
 * @param {string} str 
 */
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
}
