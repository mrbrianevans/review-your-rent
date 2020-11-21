import * as React from "react"
import {PageTitle} from "../components/PageTitle";

export const ProfilePage: () => JSX.Element = () => {

    return(
        <div>
            <PageTitle title={"Profile"}/>
            <p>
                View your profile information here
            </p>
        </div>
    )
}
