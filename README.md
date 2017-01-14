# Vercamst Consult
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Configuration

Create a .env file in project folder with the at least following variables for development:
- FIREBASE_PROJECT_ID
- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_DATABASE_URL
- FIREBASE_STORAGE_BUCKET
- GOOGLE_ANALYTICS_TRACKING_ID

You can add these optional variables for development with a different database:
- FIREBASE_API_KEY_DEV
- FIREBASE_AUTH_DOMAIN_DEV
- FIREBASE_DATABASE_URL_DEV
- FIREBASE_STORAGE_BUCKET_DEV

Add these variables for automatic deployment:
- FIREBASE_PROJECT_ID
- FTP_HOST
- FTP_USER
- FTP_PATH
- FTP_PRIVATE_KEY or FTP_PASSWORD

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production with source maps to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run deploy`

Builds the app for production without source maps to the `build` folder.<br>
Transfers the build if the correct environment variables are present. Set `--upload` flag to false to disable.<br>
Deploy the database rules. Set `--deploy-db` flag to false to disable.
