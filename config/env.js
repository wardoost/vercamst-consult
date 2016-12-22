// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  return Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env['process.env.' + key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
      // Firebase configuration
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.NODE_ENV === 'development' ? process.env.FIREBASE_API_KEY_DEV || process.env.FIREBASE_API_KEY : process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.NODE_ENV === 'development' ? process.env.FIREBASE_AUTH_DOMAIN_DEV || process.env.FIREBASE_AUTH_DOMAIN : process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.NODE_ENV === 'development' ? process.env.FIREBASE_DATABASE_URL_DEV || process.env.FIREBASE_DATABASE_URL : process.env.FIREBASE_DATABASE_URL),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.NODE_ENV === 'development' ? process.env.FIREBASE_STORAGE_BUCKET_DEV || process.env.FIREBASE_STORAGE_BUCKET : process.env.FIREBASE_STORAGE_BUCKET)
    });
}

module.exports = getClientEnvironment;
