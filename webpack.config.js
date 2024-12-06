module.exports = {
    resolve: {
      fallback: {
        zlib: require.resolve('browserify-zlib'),
        querystring: require.resolve('querystring-es3'),
        path: require.resolve('path-browserify'),
        // Add any other modules that show up as errors here
      },
    },
  };
  