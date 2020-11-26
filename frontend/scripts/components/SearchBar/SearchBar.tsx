import * as React from "react"

export const SearchBar: () => JSX.Element = () => {
    return (
        <div>
            <div id={"search-box-wrapper"}>
                <input type={"text"} placeholder={"Street address"}
                       inputMode={"search"} className={"search-box"}
                />
            </div>
            <div id={"search-suggestions"}/>
        </div>
    )
}
