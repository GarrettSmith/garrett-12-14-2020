# Garrett - 12/14/2020

[Live Site](https://garrettsmith.github.io/garrett-12-14-2020/)

## Commands

In the client project directory, you can run:

### `yarn`

Install all NPM dependencies required by this project.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the application server and Cypress in [headless mode](https://docs.cypress.io/guides/guides/command-line.html#cypress-run).

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn deploy`

Deploys the build output to GitHub pages.

See the section about [deployment](https://create-react-app.dev/docs/deployment/#github-pages) for more information.

## Security

### XSS

React is highly resistant to XSS and escapes strings by default. [Reference](https://dev.to/spukas/preventing-xss-in-react-applications-5f5j)

### CSRF

No endpoints used by the project support the `GET` method. This is not sufficient to fully prevent CSRF but does reduce possible attack vetors.

Further enhancements to limit the request origin would further limit this, but are also not sufficient to fully prevent it.
Adding proper session handling or synchronized tokens would be the ideal solution to prevent this attack.

### DOS

[Firebase has rate limits for cloud functions](https://firebase.google.com/docs/functions/quotas). Once these are reached, an attacker could
prevent the availability of the server to users.

[Implement individual requester rate limiting](https://stackoverflow.com/questions/24830079/firebase-rate-limiting-in-security-rules) could help prevent this
but is considered out of scope for a frontend specific project.

### Private Data Leakage

The application is unauthenticated, and thus, all data is publicly available.

No private credentials are used by the frontend client, preventing access leakage.

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

### Test browser support

Currently, the application has only been tested with Google Chrome 87.0.4280.88 Further browsers should be tested and support added if required.

### Improve rendering performance

The list of documents does not perform any pagination or windowing. This will lead to performance issues as the data grows in size.

### Single Environment

This application only exists in a single environment used for development, E2E tests, and production.
This should be revised to allow isolating data and to further prevent CSRF concerns by restricting request origins.

### Cypress tests run on development builds

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

### [`use-debounce`](https://github.com/xnimorz/use-debounce)

A small hook to debounce the searching of documents.

## API

All API requests are made through the Firebase client.

> The Firebase clients manages the variable domains and prefix path of the following requests. These have been documented below in their current state but may vary.

### POST `/searchDocuments`

Returns a filtered list of documents prefixed with the requested string.

> **PLEASE NOTE:** This search is intentially simple to narrow the scope of the project.

#### Example URL

```
https://us-central1-garrett-12-14-2020.cloudfunctions.net/searchDocuments
```

#### Example Request Body

```json
{
  "data": "example"
}
```

### Example Response Body

```json
{
  "result": [
    {
      "name": "example.jpg",
      "size": 83261
    },
    {
      "name": "example-image.png",
      "size": 1234
    }
  ]
}
```

### DELETE `/v0/b/{bucket-name}/o/documents%2F{filename}`

Deletes the provided file.

#### Example URL

```
https://firebasestorage.googleapis.com/v0/b/garrett-12-14-2020.appspot.com/o/documents%2Fexample.jpg
```

### Example Response Body

This endpoint does not respond with body on successful deletions.

### POST `/v0/b/{bucket-name}/o?name=documents%2F{filename}`

Uploades a new file with the given filename.

This endpoint has been configured to only allow files with the `Content-Type` `image/jpeg` and `image/png` up to a maximum filesize of 10MB.

#### Example URL

```
https://firebasestorage.googleapis.com/v0/b/garrett-12-14-2020.appspot.com/o?name=documents%2Fexample.jpg
```

### Example Response Body

Firebase uses this with appended query strings to poll for upload progress. The final polling response returns the documented response body.

```json
{
  "name": "documents/example.jpg",
  "bucket": "garrett-12-14-2020.appspot.com",
  "generation": "1607878624162589",
  "metageneration": "1",
  "contentType": "image/jpeg",
  "timeCreated": "2020-12-13T16:57:04.162Z",
  "updated": "2020-12-13T16:57:04.162Z",
  "storageClass": "STANDARD",
  "size": "350577",
  "md5Hash": "7Qhs8vZf2l16Ga6bCcGquw==",
  "contentEncoding": "identity",
  "contentDisposition": "inline; filename*=utf-8''joy.jpg",
  "crc32c": "9b7Wlg==",
  "etag": "CJ3m8NG2y+0CEAE=",
  "downloadTokens": "122a0738-e71f-46f8-a21c-e3a4553c4f64"
}
```