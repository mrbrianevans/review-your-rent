import * as React from "react"
import {useState} from "react"
import firebase from "firebase/app";
import 'firebase/database'
import ReviewBlock from "../components/ReviewBlock";
import {PageTitle} from "../components/PageTitle";
import {SubTitle} from "../components/SubTitle";
import {SearchBar} from "../components/SearchBar";
import DataSnapshot = firebase.database.DataSnapshot;

const interpretRecentReviews: (allReviews: DataSnapshot) => IReview[] = (allReviews) => {
    let reviews: IReview[] = []
    allReviews.val() && allReviews.forEach((houseReviews) => {
        let houseAddress = houseReviews.key
        houseReviews.forEach(review => {
            reviews.push({
                title: review.child('title').val() || "",
                body: review.child('body').val() || "",
                address: houseAddress,
                reviewer: review.child('reviewer').val() || "",
                date: new Date(review.child('date').val()),
                stars: review.child('stars').val() || 0
            })
        })
    })
    return reviews
}

export const HomePage = () => {
    const [recentReviews, setRecentReviews] = useState<IReview[]>()
    const [hasCalledRecentReviews, setCalledRecentReviews] = useState(false)
    if (!hasCalledRecentReviews) {
        setCalledRecentReviews(true)
        const connectTime = new Date()
        console.log("Connecting to database")
        firebase.database().ref("/reviews/").limitToFirst(5).on('value',
            dataSnapshot => {
                console.log("Value received from database in " + (new Date().valueOf() - connectTime.valueOf()) + "ms")
                setRecentReviews(interpretRecentReviews(dataSnapshot))
            })
    }

    return (
        <>
            <PageTitle title={"Homepage"}/>
            <div>
                <SubTitle subtitle={"Search"}/>
                <SearchBar/>
            </div>
            <div>
                <SubTitle subtitle={"Recent reviews"}/>
                {recentReviews ? recentReviews.map(r => <ReviewBlock review={r}/>) :
                    <p>Loading...</p>}
            </div>
        </>
    )
}
