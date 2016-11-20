module.exports = {
  combine: {
    files: {
      'dist/_css/minified/<%= pkg.name %>.css': ['dist/_css/prefixed/<%= pkg.name %>.css'],
      'demo/demo.min.css': ['demo/demo-prefixed.css']
    }
  }
}