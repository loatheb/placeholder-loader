/* eslint-disable */

/*
  always return the same source code when pass to the placeholder-loader

  why we need this?
  bacause in webpack must pass a non-string in loader array, like:

  {
    test: /\.js$/,
    use: [
      'babel-loader',
      'ts-loader',
    ]
  }

  but sometime, we want to use different loader in different env, like:

  {
    test: /\.js$/,
    use: [
      'babel-loader',
      process.env.NODE_ENV === 'production' ? 'awesome-typescript-loader' : 'ts-loader'
    ]
  }

  the placeholder loader is to solve some config like this:

  {
    test: /\.js$/,
    use: [
      'babel-loader',
      process.env.NODE_ENV === 'SERVER_RENDERING' ? '' : 'promise-loader'
    ]
  }

  in the config above, we don't use promise-loader when the SERVER_RENDERING is true,
  but webpack doesn't allow empty string, we must write something at there.
  so, we can write the path to placeholder-loader, it will pipe the code to next loader.
*/

module.exports = function(remaining) {
  var result = [
    'module.exports = (function () {\n',
    '  return ' + remaining + '\n',
    '})();'
  ]
  return result.join('')
}
