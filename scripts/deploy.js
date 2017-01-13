// Do this as the first thing so that any code reading it knows this is for deployment
process.env.DEPLOY = true;

// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

var fs = require('fs');
var childProcess = require('child_process');
var path = require('path');
var chalk = require('chalk');
var ftp = require('scp2')
var Client = require('scp2').Client
var paths = require('../config/paths');

// Run build script and deploy database rules
childProcess.fork('scripts/build.js').on('exit', function (err) {
  if (err) throw err;
    console.log('The ' + chalk.cyan('build') + ' folder is ready to be deployed. Starting file transfer...');
    console.log();

    var ftpClient = new Client({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      username: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
    });

    ftpClient.on('write', function(options) {
      console.log(
        '  ' +
        chalk.dim('build' + path.dirname(options.source).replace(paths.appBuild, '') + path.sep) +
        chalk.cyan(path.basename(options.source)) +
        ' -> ' +
        chalk.dim(path.dirname(options.destination) + path.sep) +
        chalk.cyan(path.basename(options.destination))
      );
    })

    ftp.scp(paths.appBuild, {path: process.env.FTP_PATH}, ftpClient, function(err) {
      if (err) throw err;
      console.log();
      console.log(chalk.green('All files transfered successfully.'));
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
        console.log('👏  ' + chalk.green('Deployment successfull') + ' 👏');
        console.log();
    })
  });
});
