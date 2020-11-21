import * as React from "react";
import * as ReactDOM from 'react-dom';
import {firebaseConfig} from "./firebaseConfig";
import firebase from "firebase/app";
import App from "./App";

const initialiseFirebaseApp = () => {
    const datetime = new Date()
    console.log("Initialising firebase app. At: " + datetime.toLocaleTimeString())
    firebase.initializeApp(firebaseConfig)
    console.log("App initialised. At: " + datetime.toLocaleTimeString())
}

if (firebase.apps.length === 0)
    initialiseFirebaseApp()

ReactDOM.hydrate(<App/>, document.getElementById("root"))
