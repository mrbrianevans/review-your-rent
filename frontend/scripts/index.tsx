import * as React from "react";
import * as ReactDOM from 'react-dom';
import {firebaseConfig} from "./firebaseConfig";
import firebase from "firebase/app";
import App from "./App";
import {addAutocompleteEventListenerToSearchBox} from "./components/SearchBar/addAutocompleteEventListenerToSearchBox";

const initialiseFirebaseApp = () => {
    const startIntialiseTime = new Date()
    firebase.initializeApp(firebaseConfig)
    console.log("App initialised in " + (new Date().valueOf() - startIntialiseTime.valueOf()) + "ms")
}

if (firebase.apps.length === 0)
    initialiseFirebaseApp()

window.addAutocompleteEventListenerToSearchBox = addAutocompleteEventListenerToSearchBox

ReactDOM.hydrate(<App/>, document.getElementById("root"))
