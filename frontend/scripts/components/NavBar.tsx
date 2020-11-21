import * as React from "react";

export const NavBar = () =>
    <nav className={"top-nav-bar"}>
        <ul>
            <li><a href={'/'}>Home</a></li>
            <li><a href={'/property'}>View property</a></li>
            <li><a href={'/profile'}>View profile</a></li>
        </ul>
    </nav>
