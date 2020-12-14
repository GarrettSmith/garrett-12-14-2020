# Garrett - 12/14/2020

[Live Site](https://garrettsmith.github.io/garrett-12-14-2020/)

A React based single page application and API which allows users to upload and manage files.

## Installation

Run the following commands in the `./client` directory:

```shell
yarn
yarn start
```

Further commands are documented in the corresponding project's README.

### [Frontend client](./client)

The intended submission for the project.

### [Backend server](./server)

Enables the frontend client's search functionality.

## Security

### XSS

React is highly resistant to XSS and escapes strings by default. [Reference](https://dev.to/spukas/preventing-xss-in-react-applications-5f5j). 

No unescaped content is rendered within the client application.

### CSRF

No session cookies are used and no endpoints used by the project and mutate state support the `GET` method.

### DDoS

[Firebase has rate limits for cloud functions](https://firebase.google.com/docs/functions/quotas). Once these are reached, an attacker could
prevent the availability of the server to users.

[Implement individual requester rate limiting](https://stackoverflow.com/questions/24830079/firebase-rate-limiting-in-security-rules) could help prevent this
but is considered out of scope for a frontend specific project.

### Private data leakage

The application is unauthenticated, and thus, all data is publicly available.

No private credentials are used by the frontend client, preventing access leakage.

### Insecure dependencies

[`yarn audit`](https://classic.yarnpkg.com/en/docs/cli/audit/) has been run against the project with no known vulnerabilities found.

```
$ yarn audit
yarn audit v1.12.1
info No lockfile found.
0 vulnerabilities found - Packages audited: 0
Done in 0.70s.
```

### Application monitoring

While not strictly a security concern, the client application has no form of automatic monitoring, beyond that performed on the whol of the System by GitHub and Firebase. Any issue that does occur, and is not monitored automatically, is unknown without manual verification. This could be mitigated with automated health checks, such as pinging the server or running periodic E2E tests.

## Improvements

### i18n improvements

- detect browser language
- provide other locales
- load translations dynamically
- translate error messages

### Move Firebase configuration to a configuration file

- This will enable the usage of multiple environments and improve modularity.

### Error handling

- Currently, error messages are presented directly to end-users. This should follow a more user-friendly format and provide them a method to correct the issue if possible.
- Additional error boundaries should be added to limit the potential scope and uncaught error could cause issues in.
- An error logging tool, E.G. Sentry, should be added to further track runtime errors.

### Firebase security configuration

### Browser support

The application has only been tested with Google Chrome 87.0.4280.88 Further browsers should be tested and support added if required.

### Measure and improve rendering performance

The list of documents does not perform any pagination or windowing. This will lead to performance issues as the data grows in size.

### Single environment

This application only exists in a single environment used for development, E2E tests, and production.
This should be revised to allow isolating data and to enable further preventing CSRF concerns by restricting request origins.

### Cypress tests run on development builds

The test commands are ran using `yarn start` which starts a development server. This should be extended to serve the output of `yarn build` to further ensure the correctness of the production release.

### Display upload progress

Firebase provides the progress as documents are uploaded. This could be displayed to the user rather than the current indeterminate loading spinner.

### Rate limit users

There is currently no user-specific rate limiting. This makes the application server vulnerable to DDoS attacks.

### Share typings between client and server

The client and server are both colocated in this repository and written in TypeScript. Whith more configuration, shared types for API contracts could be shared between the client and server to enforce type safety.

### Continuous deployment

- Only deploy client when client code changes are made. Currently, any change to master will trigger a new deployment
- Deploy Firebase Function on changes to server code. Currently, the function needs to be manually published

### Image loading

Images are currently loaded at full resolution. Production apps should take measures to reduce thumbnail resolutions in order to reduce bandwidth usage and improve load times.

## Libraries

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### [@material-ui/core](https://material-ui.com/)

A React implementation of Google's Material Design.

### [`cypress`](https://www.cypress.io/)

An end-to-end testing library.

#### [`cypress-file-upload`](https://www.npmjs.com/package/cypress-file-upload)

File upload utility commands for Cypress.

### [`firebase`](https://firebase.google.com/)

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

#### Example request body

```json
{
  "data": "example"
}
```

### Example response body

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

### Example response body

This endpoint does not respond with body on successful deletions.

### POST `/v0/b/{bucket-name}/o?name=documents%2F{filename}`

Uploades a new file with the given filename.

This endpoint has been configured to only allow files with the `Content-Type` `image/jpeg` and `image/png` up to a maximum filesize of 10MB.

#### Example URL

```
https://firebasestorage.googleapis.com/v0/b/garrett-12-14-2020.appspot.com/o?name=documents%2Fexample.jpg
```

### Example response body

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

## Other notes

### GitHub issues

[GitHub issues](https://github.com/GarrettSmith/garrett-12-14-2020/issues?q=is%3Aissue) were used to organize requirements and assumption. Please refer to them for more information on the planning process.

### Image display

The included designs did not include image previews. This assumption was made based on the file type restriction (jpg and png). This assumption would normally be verified with the proper designer or product owner prior to implementation.

### CI and CD

The client application is configured with GitHub Actions that run CI tasks on PRs and automatically release updates to `main` to GitHub Pages.

### Search

The search implementation is intended to be considered a mock. It preforms a case-sensitive filter of documents with the provided prefix.