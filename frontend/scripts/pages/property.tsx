import * as React from "react"
import {useState} from "react"
import {useParams} from 'react-router-dom'
import firebase from "firebase/app";
import 'firebase/database'
import ReviewBlock from "../components/ReviewBlock";
import DataSnapshot = firebase.database.DataSnapshot;

const interpretHouseReviews: (allReviews: DataSnapshot) => IReview[] = (houseReviews) => {
    let reviews: IReview[] = []
    houseReviews.forEach(review => {
        reviews.push({
            title: review.child('title').val() || "",
            body: review.child('body').val() || "",
            address: houseReviews.key,
            reviewer: review.child('reviewer').val() || "",
            date: new Date(review.child('date').val()),
            stars: review.child('stars').val() || 0
        })
    })
    return reviews
}

export const PropertyPage: () => JSX.Element = () => {
    const [houseReviews, setHouseReviews] = useState<IReview[]>()
    const {houseId} = useParams()

    const getHouseInformation = (houseId) => {
        // call the realtime database and retrieve some details about the house, including any reviews
        const connectTime = new Date()
        console.log("Connecting to database")
        firebase.database().ref(`/reviews/`).child(houseId)
            .on('value', (dataSnapshot) => {
                console.log("Value received from database in " + (new Date().valueOf() - connectTime.valueOf()) + "ms")
                setHouseReviews(interpretHouseReviews(dataSnapshot))
            })
    }

    const [hasCalledDatabase, setCalledDatabase] = useState(false)
    if (!hasCalledDatabase) {
        setCalledDatabase(true)
        getHouseInformation(houseId)
    }

    return (
        <>
            <div>
                <p>
                    You are viewing a property with id={houseId}
                </p>
                <div>
                    {houseReviews ? houseReviews.map(r => <ReviewBlock review={r}/>) : <p>Loading...</p>}
                </div>
            </div>
        </>
    )
}
