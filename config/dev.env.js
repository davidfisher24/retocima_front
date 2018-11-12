'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //API_URL: '"http://retocima/api/"',
  //API_URL: '"http://79.137.45.63/retocima/public/api/"'
  API_URL: '"http://localhost/retocima/public/api/"'
})
