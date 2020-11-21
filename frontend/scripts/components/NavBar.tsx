import * as React from "react";
import {Link} from 'react-router-dom'

export const LinkedNavBar = () =>
    <nav className={"top-nav-bar"}>
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/property'}>View property</Link></li>
            <li><Link to={'/profile'}>View profile</Link></li>
        </ul>
    </nav>
