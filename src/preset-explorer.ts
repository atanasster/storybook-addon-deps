const wp = require('./webpack-preset');

module.exports = {
  webpack: wp,
  managerEntries: [require.resolve('./register')],
  config: (entry: any[] = []) => {
    return [...entry, ...[require.resolve('./addDecorator')]];
  }
}  
