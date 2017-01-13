// Do this as the first thing so that any code reading it knows this is for deployment
process.env.DEPLOY = true;

// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

var fs = require('fs');
var childProcess = require('child_process');
var chalk = require('chalk');

// Run build script and deploy database rules
childProcess.fork('scripts/build.js').on('exit', function (err) {
  if (err) throw err;
  console.log();
  console.log('Deploying Firebase rules to ' + chalk.cyan(process.env.FIREBASE_PROJECT_ID) + '...')
  childProcess.exec(`firebase deploy --only database --project ${process.env.FIREBASE_PROJECT_ID}`, (error, stdout, stderr) => {
    if (error) {
      console.log();
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(chalk.green('Database rules deployed successfully.'));
    console.log();
  });
});
