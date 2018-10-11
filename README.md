# Countdown

A simple word game inspired by the long-running British game show. See a demo
[here](https://infinite-dusk-13243.herokuapp.com/).
## Description

The game is about finding as many valid words as possible in a given
set of random characters before the time runs out. A "valid" word
is determined by the [Words API](https://www.wordsapi.com/) which will
check for a definition of the submitted word in order to vaidate the
submission and award points.(Sometimes these definitions are questionable
or just missing).

Technologies used:

- Front end: ReactJS
- UI build system: Webpack, babel
- Back end: NodeJS and express
- Unit tests: Jest


## Installing

Requires NodeJS > v6.0 and npm. Clone repo and cd into directory. Run:

```bash
  npm install
```

This may take a little while.

## Running

Requires an API key for [WordsAPI](https://www.wordsapi.com/).
Before you can start the application you wlil have to add
your API key to server configuration. Create a file at
`server/config/api_key.json` and insert the following:

```json
{
  "API_KEY": "<your_api_key_string>"
}
```

In order to build the UI, first run
```bash
npm build
```

You can also specify `~build` instead to watch the source files
and rebuild upon change.

Once UI is built, start the server with:
```bash
npm start
```
or
```bash
npm ~start
```
to run with nodemon and watch the files. Then navigate to
`localhost:3000` to see the app in action.
