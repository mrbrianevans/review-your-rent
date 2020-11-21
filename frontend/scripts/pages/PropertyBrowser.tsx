import * as React from "react";
import {useState} from "react";
import {Link} from 'react-router-dom'
import firebase from "firebase/app";
import 'firebase/database'
import {PageTitle} from "../components/PageTitle";
import DataSnapshot = firebase.database.DataSnapshot;

const interpretListOfHouses: (dataSnapshot: DataSnapshot) => string[] = (dataSnapshot) => {
    let properties: string[] = []
    dataSnapshot.val() && dataSnapshot.forEach((houseReviews) => {
        properties.push(houseReviews.key)
    })
    return properties
}

export const PropertyBrowser = () => {
    const [listOfHouses, setListOfHouses] = useState<string[]>()
    const getListOfHouses = () => {
        const connectTime = new Date()
        console.log("Connecting to database")
        firebase.database().ref(`/reviews/`)
            .on('value', (dataSnapshot) => {
                console.log("Value received from database in " + (new Date().valueOf() - connectTime.valueOf()) + "ms")
                setListOfHouses(interpretListOfHouses(dataSnapshot))
            })
    }

    const [hasCalledDatabase, setCalledDatabase] = useState(false)
    if (!hasCalledDatabase) {
        setCalledDatabase(true)
        getListOfHouses()
    }
    return (
        <div>
            <PageTitle title={"Browse properties"}/>
            <ul className={"property-browser-list"}>
                {listOfHouses?.map(houseId => <li><Link
                    to={`property/${houseId}`}>View {houseId}</Link>
                </li>)}
                <li><Link to={'/property/fake-house'}>View a non-existant house link</Link></li>
            </ul>
        </div>

    )
}
