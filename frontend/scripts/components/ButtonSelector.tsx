import * as React from "react"

export const ButtonSelector = (props: { options: string[], value: string | undefined, onChange: (selectedOption: string) => void }) => {

    return (
        <>
            {props.options.map((option, index) =>
                <button key={index} onClick={() => props.onChange(option)}
                        className={props.value == option ? "selected" : "deselected"}>
                    {option}
                </button>
            )}
        </>
    )
}
