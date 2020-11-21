import * as React from "react";

export const SubTitle: (props: { subtitle: string }) => JSX.Element = (props) => {
    return (
        <>
            <div className={"sub-title-container"}>
                <div className={"sub-title-stripe"}/>
                <div className={"sub-title-label"}>
                    <h3 className={"sub-title"}>{props.subtitle}</h3>
                </div>
            </div>

        </>
    )
}
