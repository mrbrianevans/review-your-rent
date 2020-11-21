import * as React from "react";

export const PageTitle: (props: { title: string }) => JSX.Element = (props) => {
    return (
        <>
            <div className={"top-header-container"}>
                <div className={"top-header-stripe"}/>
                <div className={"top-header-title"}>
                    <h2 className={"page-title"}>{props.title}</h2>
                </div>
            </div>

        </>
    )
}
