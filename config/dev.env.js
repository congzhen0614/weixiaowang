var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	// 环境变量
  NODE_ENV: '"development"'
})
