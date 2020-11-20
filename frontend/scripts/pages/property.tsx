import * as React from "react"
import { useParams } from 'react-router-dom'

export const PropertyPage: () => JSX.Element = () => {

    const { houseId } = useParams()

    const getHouseInformation = (houseId) => {
        // call the realtime database and retrieve some details about the house, including any reviews
    }

    return (
        <>
            <div>
                <p>
                    You are viewing a property with id={houseId}
                </p>
            </div>
        </>
    )
}