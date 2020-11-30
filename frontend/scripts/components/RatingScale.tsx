import {Star, StarBorder} from "@material-ui/icons";
import * as React from "react";

export const RatingScale = (props: { value: number, onChange: (value: number) => void }) => {

    return (
        <>
            {Array(props.value).fill(0).map((element, index) => (
                <Star key={index}
                      onClick={() => {
                          props.onChange(index + 1)
                      }}
                />
            ))}
            {Array(5 - props.value).fill(0).map((element, index) => (
                <StarBorder key={index}
                            onClick={() => {
                                props.onChange(props.value + index + 1)
                            }}
                />
            ))}
        </>
    )
}
