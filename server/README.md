# Garrett - 12/14/2020

A simple [Firebase Cloud Function](https://firebase.google.com/docs/functions) to provide [document searching](../client/README.md#post-searchdocuments).

> **PLEASE NOTE:** This is intended to be a mock to enable the client application. It is functional, but should not be considered
> production-ready.

## Ensure you have the `firebase-tools` installed.

```
npm i -g firebase-tools
```

## Commands

In the server project's `/function` directory, you can run:

### `yarn`

Install all NPM dependencies required by this project.

### `yarn build`

Compiles the TypesCript functions.

### `yarn deploy`

Deploy the `searchDocuments` function to Firebase.