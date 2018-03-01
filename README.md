# redux-fetchy-middleware
Fetch-wrapping middleware for Redux

[![Build Status](https://travis-ci.org/TheMagoo73/redux-fetchy-middleware.svg?branch=master)](https://travis-ci.org/TheMagoo73/redux-fetchy-middleware) [![Coverage Status](https://coveralls.io/repos/github/TheMagoo73/redux-fetchy-middleware/badge.svg?branch=master)](https://coveralls.io/github/TheMagoo73/redux-fetchy-middleware?branch=master)

`redux-fetchy-middleware` provides a Redux middleware that wraps the Fetch API (or polyfill), allowing a simple action dispatch to asynchronusly reqest data from an API, and automatically trigger the dispatch of success or failure actions based on the API response.

## Installation

Installation using NPM
```sh
npm i --save redux-fetchy-middleware 
```
Or use Yarn
```sh
yarn add redux-fetchy-middleware
```

## Usage

### CommonJS

```javascript
var reduxFetchy = require('redux-fetchy-middleware').default
```

### ES modules

```javascript
import ReducFetchy from 'redux-fetchy-middleware')
```

### UMD

```javascript
var ReduxFetchy = window.ReduxFetchy.default
```

## Configuration

## License

MIT
