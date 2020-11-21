import * as React from "react";
import {HomePage} from "./pages/HomePage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {PropertyPage} from "./pages/property";
import {ProfilePage} from "./pages/profile";
import {LinkedNavBar} from "./components/NavBar";
import {PropertyBrowser} from "./components/PropertyBrowser";

const App: () => JSX.Element = () =>
    <>
        <Router>
            <h1>Review Your Rent</h1>
            <LinkedNavBar/>

            <Switch>
                <Route path={"/property/:houseId"} children={<PropertyPage/>}/>
                <Route path={"/property"}>
                    <PropertyBrowser/>
                </Route>
                <Route path={"/profile"}>
                    <ProfilePage/>
                </Route>
                <Route path={"/"}>
                    <HomePage/>
                </Route>
            </Switch>
        </Router>
    </>


export default App
