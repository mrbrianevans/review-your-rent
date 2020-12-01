import * as React from "react";
import {Link} from 'react-router-dom'

export const Logo: () => JSX.Element = () => {
    return (
        <div className={"logo-container"}>
            <Link to={'/'}>
                <h1><LogoIcon size={60}/> Review Your Rent</h1>
            </Link>
        </div>
    )
}

const LogoIcon: (props: { size: number }) => JSX.Element = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.94 109.36" width={props.size}
             height={props.size}>
            <defs>
                <style>.a&#123;stroke:#000;stroke-miterlimit:10;&#125;.b&#123;fill:#ff744d;&#125;</style>
            </defs>
            <path className="a"
                  d={"M104.5,50.16V19.64H88.27V38.28l-17.77-13L7.23,71.58l3.54,4.84,9-6.55L39,128h63l19.28-58.13,8.95,6.55,3.54-4.84ZM92.25,89.73l5.13,29.94L70.5,105.53,43.62,119.67l5.13-29.94L27,68.53l30.06-4.37L70.5,36.92,83.94,64.16,114,68.53Z"}
                  transform={"translate(-6.53 -19.14)"}/>
            <polygon className="b"
                     points={"85.72 70.59 90.85 100.53 63.97 86.39 37.09 100.53 42.22 70.59 20.47 49.39 50.53 45.02 63.97 17.78 77.41 45.02 107.47 49.39 85.72 70.59"}/>
        </svg>
    )
}
