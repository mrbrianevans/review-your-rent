import * as React from "react";
import * as ReactDOM from 'react-dom';
import {firebaseConfig} from "./firebaseConfig";
import firebase from "firebase/app";
import 'firebase/analytics'
import App from "./App";

const initialiseFirebaseApp = () => {
    const startIntialiseTime = new Date()
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
    console.log("App initialised in " + (new Date().valueOf() - startIntialiseTime.valueOf()) + "ms")
}

if (firebase.apps.length === 0)
    initialiseFirebaseApp()

ReactDOM.hydrate(<App/>, document.getElementById("root"))
