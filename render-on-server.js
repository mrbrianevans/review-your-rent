import App from "./frontend/scripts/App";

const React = require('react')

const ReactDOMServer = require('react-dom/server');

// this should be a script that runs on the server whenever a change is made to the homepage,
// to render the homepage statically and save it as a html file to be served, and hydrated
console.log(ReactDOMServer.renderToString(React.createElement(App)))
