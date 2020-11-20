import * as React from "react";
import {HomePage} from "./pages/HomePage";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {PropertyPage} from "./pages/property";
import {ProfilePage} from "./pages/profile";

const App: () => JSX.Element = () =>
    <>
        <Router>
            <h1>Review Your Rent</h1>
            <nav className={"top-nav-bar"}>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/property'}>View property</Link></li>
                    <li><Link to={'/profile'}>View profile</Link></li>
                </ul>
            </nav>

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
