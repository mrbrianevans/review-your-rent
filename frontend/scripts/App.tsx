import * as React from "react";
import {HomePage} from "./pages/HomePage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {PropertyPage} from "./pages/PropertyPage";
import {ProfilePage} from "./pages/ProfilePage";
import {LinkedNavBar} from "./components/NavBar";
import {PropertyBrowser} from "./pages/PropertyBrowser";
import {Logo} from "./components/Logo";

const App: () => JSX.Element = () =>
    <>
        <Router>
            <Logo/>
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
