import * as React from "react";
import {Link} from 'react-router-dom'

export const Logo: () => JSX.Element = () => {
    return (
        <Link to={'/'}>
            <div className={"logo-container"}>
                <h1 className={"logo"}>Review Your Rent</h1>
            </div>
        </Link>


    )
}
