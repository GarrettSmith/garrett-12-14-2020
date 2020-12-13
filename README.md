# Garrett - 12/14/2020

[Live Site](https://garrettsmith.github.io/garrett-12-14-2020/)

## Installation

In the project directory, you can run:

### `yarn`

Install all NPM dependencies required by this project.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Security

### Addressed

#### XSS

React is highly resistant to XSS and escapes strings by default.

#### XSRF

#### DOS

### Not Addressed

#### Private Data Leakage

The application is unauthenticated, and thus, all data is publicly available.

## Improvements

### i18n improvements

- detect browser language
- provide other locales
- load translations dynamically
- translate error messages

### Move Firebase configuration to a configuration file

### Error handling

- Currently, error messages are presented directly to end-users. This should follow a more user-friendly format and provide them a method to correct the issue if possible.
- Error boundaries should be added to limit the potential scope and uncaught error could cause issues in.
- An error logging tool, E.G. Sentry, should be added to further track runtime errors.

### Improve Firebase security configuration

### Reduce requests for document information

To get the size of a document, we are required to make a separate request to Firebase. This means that to get the total file size, we need to make a request per document.

### Test browser support

Currently, the application has only been tested with Google Chrome 87.0.4280.88 Further browsers should be tested and support added if required.

## Libraries

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### [@material-ui/core](https://material-ui.com/)

A React implementation of Google's Material Design.

### [`cypress`](https://www.cypress.io/)

An end-to-end testing library.

#### [`cypress-file-upload`](https://www.npmjs.com/package/cypress-file-upload)

File upload utility commands for Cypress.

### [`firebase](https://firebase.google.com/)

Client library for Firebase. The backend application service.

### [`gh-pages`](https://pages.github.com/)

A tool to publish the site to GitHub Pages.

### [`husky`](https://www.npmjs.com/package/husky)

Command to register hooks with git. Used to run `prettier`

### [`i18next` and `react-i18next`](https://www.npmjs.com/package/i18next)

Internatioinalization (i18n) framework.

### [`numeral`](http://numeraljs.com/)

A library used to format filesizes in human-readable strings.

### [`prettier`](https://prettier.io/)

An automated code formatter. Used to maintain a consistent code-style.

### [`start-server-and-test`](https://www.npmjs.com/package/start-server-and-test)

A tool used to run Cypress and an application in parallel for E2E testing.

### [`typescript`](https://www.typescriptlang.org/)

A superset of JavaScript that provides strong typing. Reduces runtime errors and development time.

## API
// Any general observation about the API?
// document each endpoint using the following template:
```
### GET /resources
// Description of the endpoint:
// - what does the endpoint do?
// - what does it return?
// - does it accept specific parameters?
```

---
## Other notes
// Anything else you want to mention
