import * as ReactDOMServer from "react-dom/server";
import App from "./App";
import * as React from "react";
import firebase from "firebase/app";
import {firebaseConfig} from "./firebaseConfig";


const initialiseFirebaseApp = () => {
    const startIntialiseTime = new Date()
    firebase.initializeApp(firebaseConfig)
    console.log("App initialised in " + (new Date().valueOf() - startIntialiseTime.valueOf()) + "ms")
}

if (firebase.apps.length === 0)
    initialiseFirebaseApp()

const indexPrerender = ReactDOMServer.renderToString(React.createElement(App))
console.log(indexPrerender)

if (document.getElementById("index_html"))
    document.getElementById("index_html").innerText = indexPrerender

const htmlEncode = (str) => {
    return str.replaceAll("<", "&lt;").replace(">", "&gt;")
}

document.write("<p>Index.html server side render root element: </p>")
document.write(htmlEncode(indexPrerender.toString()))

// ideally this would write to a file in public/static-pages but I'm not sure if thats possible
