const routes = require('next-routes')

module.exports = routes()
  .add('index')
  .add('sobre', '', 'about')
  .add('certificaciones')
// Here you can new routes
// Read more in next-routes DOCS
