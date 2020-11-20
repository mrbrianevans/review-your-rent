import * as React from "react";
import * as ReactDOM from 'react-dom';
import App from './App'
import firebase from "firebase/app";
import {firebaseConfig} from "./firebaseConfig";

const initialiseFirebaseApp = () => {
    console.log("Initialising firebase app. Length: " + firebase.apps.length)
    firebase.initializeApp(firebaseConfig)
}
if (firebase.apps.length === 0)
    initialiseFirebaseApp()

ReactDOM.render(<App/>, document.getElementById("root"))
