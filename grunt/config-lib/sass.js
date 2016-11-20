module.exports = {
  dist: {
    options: {
      style: 'expanded',
      lineNumbers:true
    },
    files: {
      'dist/_css/<%= pkg.name %>.css': 'src/<%= pkg.name %>.scss',
      'demo/demo.css': 'src/demo.scss'
    }
  }
}