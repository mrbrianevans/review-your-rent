import * as React from "react";
import {useState} from "react";
import {Link} from 'react-router-dom'
import firebase from "firebase/app";
import 'firebase/database'
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
        <>
            {listOfHouses?.map(houseId => <div><Link to={`property/${houseId}`}>View {houseId}</Link></div>)}
            <Link to={'/property/fake-house'}>View a non-existant house link</Link>
        </>
    )
}