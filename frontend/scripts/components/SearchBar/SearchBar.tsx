import * as React from "react"
import {useEffect, useState} from "react"
import {addAutocompleteEventListenerToSearchBox} from "./addAutocompleteEventListenerToSearchBox";

export const SearchBar: () => JSX.Element = () => {
    const [hasAddedEventListener, setHasAddedEventListener] = useState(false)
    // on each render, it checks the google object, and if it changes (from undefined to object)
    // then it will add the event listener, otherwise not
    useEffect(() => {
        if (hasAddedEventListener)
            return
        else if (typeof google != 'undefined') {
            setHasAddedEventListener(true)
            addAutocompleteEventListenerToSearchBox()
        }
    }, [typeof google])

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
