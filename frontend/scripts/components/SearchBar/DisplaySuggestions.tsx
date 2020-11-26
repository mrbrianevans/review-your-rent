import * as React from "react";
import {IAddressSuggestion} from "../../types/IAddressSuggestion";
import {addAddressToDatabase} from "./addAddressToDatabase";

//TODO: This is using <a> tags to link to properties, becuase it is rendered separately from
// the main react app which has the react router dom, and you can't have <Link>'s outside the dom.
// This needs to be fixed because ATM, it reloads the app if you click a property (not good)
export const DisplaySuggestions: (suggestions: IAddressSuggestion[]) => JSX.Element = suggestions =>
    <>
        {suggestions?.map((suggestion, index) =>
                <span key={index} className={"search-suggestion"} onClick={
                    () => {
                        addAddressToDatabase(suggestion) // this auto redirects
                    }
                }>
                        {/*<Link to={`/property/${suggestion.address}`}>*/}
                    {/*    {suggestion.address}*/}
                    {/*</Link>*/}

                    {/*    <a href={`/property/${suggestion.address}`}>{suggestion.address}</a>*/}

                    {suggestion.address}

                    </span>
                )}
                {suggestions && <div id={"google-maps-attribution"}/>}
    </>

