const wp = require('./webpack-preset');

module.exports = {
  webpack: wp,
  addons: [require.resolve('./register')]
}  
