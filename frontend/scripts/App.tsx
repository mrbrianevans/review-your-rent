import * as React from "react";
import {HomePage} from "./pages/HomePage";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {PropertyPage} from "./pages/property";
import {ProfilePage} from "./pages/profile";
import {NavBar} from "./components/NavBar";

const App: () => JSX.Element = () =>
    <>
        <Router>
            <h1>Review Your Rent</h1>
            <NavBar/>

            <Switch>
                <Route path={"/property/:houseId"} children={<PropertyPage/>}/>
                <Route path={"/property"}>
                    <Link to={'/property/house-id'}>View house-id</Link>
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
