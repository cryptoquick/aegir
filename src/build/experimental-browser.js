'use strict'
const resolveBin = require('resolve-bin')
const execa = require('execa')
const path = require('path')
const here = p => path.join(__dirname, p)
const bin = resolveBin.sync('webpack-cli')

module.exports = (argv) => {
  const input = argv._.slice(1)
  const useBuiltinConfig = !input.includes('--config')
  const config = useBuiltinConfig
    ? ['--config', here('../config/webpack.config.js')]
    : []
  return execa(bin, [
    ...config,
    '--env.' + argv.env,
    ...input
  ], {
    env: {NODE_ENV: argv.env},
    stdio: 'inherit'
  })
}