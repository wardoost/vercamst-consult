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

function ensureSlash(path, needsSlash) {
  var hasSlash = path.endsWith(path.sep);
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return path + path.sep;
  } else {
    return path;
  }
}

// Input: /User/dan/app/build/static/js/main.82be8.js
// Output: /static/js/main.js
function getLastDir(path) {
  return ensureSlash(path, false)
    .replace(/.*\/([^\/]+)/, (match, p1) => p1);
}

function uploadBuild(callback) {
  if (process.env.FTP_PATH && process.env.FTP_HOST && process.env.FTP_USER && (process.env.FTP_PASSWORD || process.env.FTP_PRIVATE_KEY)) {
    console.log('Starting file transfer...');
    console.log();

    var ftpClient = new Client({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      username: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      privateKey: process.env.FTP_PRIVATE_KEY,
    });

    ftpClient.on('write', function(options) {
      console.log(
        '  ' +
        chalk.dim('build' + path.dirname(options.source).replace(paths.appBuild, '') + path.sep) +
        chalk.cyan(path.basename(options.source)) +
        ' -> ' +
        chalk.dim(getLastDir(process.env.FTP_PATH) + path.dirname(options.destination).replace(process.env.FTP_PATH, '') + path.sep) +
        chalk.cyan(path.basename(options.destination))
      );
    })

    ftp.scp(paths.appBuild, {path: process.env.FTP_PATH}, ftpClient, function(err) {
      if (err) {
        callback(err);
      } else {
        console.log();
        console.log(chalk.green('All files transfered successfully.'));

        callback(null, true);
      }
    });
  } else {
    console.log();
    if (!process.env.FTP_PATH) console.log(chalk.cyan('FTP_PATH') + ' environment variable required to upload.');
    if (!process.env.FTP_HOST) console.log(chalk.cyan('FTP_HOST') + ' environment variable required to upload.');
    if (!process.env.FTP_USER) console.log(chalk.cyan('FTP_USER') + ' environment variable required to upload.');
    if (!process.env.FTP_PASSWORD && !process.env.FTP_PRIVATE_KEY) console.log(chalk.cyan('FTP_PASSWORD') + ' or ' + chalk.cyan('FTP_PRIVATE_KEY') + ' environment variable required to upload.');
    console.log(chalk.red('Could not upload files!'));

    callback();
  }
}

function deployDbRules(callback) {
  if (process.env.FIREBASE_PROJECT_ID) {
    console.log('Deploying Firebase rules to ' + chalk.cyan(process.env.FIREBASE_PROJECT_ID) + '...')
    childProcess.exec(`firebase deploy --only database --project ${process.env.FIREBASE_PROJECT_ID}`, (err, stdout, stderr) => {
      if (err) callback(err)

      console.log(chalk.green('Database rules deployed successfully.'));
      callback(null, true)
    });
  } else {
    console.log(chalk.cyan('FIREBASE_PROJECT_ID') + ' environment variable required to deploy the database rules.');
    console.log(chalk.red('Could not deploy database rules!'));
    callback()
  }
}

// Run build script and deploy database rules
childProcess.fork('scripts/build.js').on('exit', function (err) {
  if (err) throw err;

  uploadBuild(function(err, ftpSuccess) {
    if (err) throw err;
    console.log();
    deployDbRules(function(err, deployDbSuccess) {
      if (err) throw err;
      if (ftpSuccess && deployDbSuccess) {
        console.log();
        console.log('👏  ' + chalk.green('Deployment successfull') + ' 👏');
        console.log();
      } else {
        console.log();
        if (!ftpSuccess) console.log('😵  ' + chalk.red('You still have to transfer the files in the ' + chalk.cyan('build') + ' folder') + ' 😵');
        if (!deployDbSuccess) console.log('😵  ' + chalk.red('You still have to deploy the database rules') + ' 😵');
        console.log();
      }
    })
  })
});