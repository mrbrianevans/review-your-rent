// import {Star, StarBorder} from "@material-ui/icons";
import * as React from "react";

export const RatingScale = (props: { value: number, onChange: (value: number) => void }) => {

    return (
        <>
            {Array(props.value).fill(0).map((element, index) => (
                <HouseStar key={index}
                           onClick={() => {
                               props.onChange(index + 1)
                           }}
                />
            ))}
            {Array(5 - props.value).fill(0).map((element, index) => (
                <HouseStarOutline key={index}
                                  onClick={() => {
                                      props.onChange(props.value + index + 1)
                                  }}
                />
            ))}
        </>
    )
}

const HouseStarOutline = (props: { onClick: () => void }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" onClick={props.onClick}
             width={30} height={30}>
            <defs>
                <style>.a&#123;stroke:#000;stroke-miterlimit:10;&#125;</style>
            </defs>
            <path className="a"
                  d="M109,48.16V17.64H92.77V36.28L75,23.28,11.73,69.58l3.54,4.84,9-6.55L43.5,126h63l19.28-58.13,8.95,6.55,3.54-4.84ZM96.75,87.73l5.13,29.94L75,103.53,48.12,117.67l5.13-29.94L31.5,66.53l30.06-4.37L75,34.92,88.44,62.16l30.06,4.37Z"/>
        </svg>
    )
}
const HouseStar = (props: { onClick: () => void }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.94 109.36" width={30} height={30}
             onClick={props.onClick}>
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
