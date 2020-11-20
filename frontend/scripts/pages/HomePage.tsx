import * as React from "react"
import {useState} from "react"
import firebase from "firebase/app";
import 'firebase/database'
import ReviewBlock from "../components/ReviewBlock";
import DataSnapshot = firebase.database.DataSnapshot;

const updateRecentReviews: (allReviews: DataSnapshot) => IReview[] = (allReviews) => {
    let reviews: IReview[] = []
    console.log("Database queried")
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
        firebase.database().ref("/reviews/").limitToFirst(5).on('value',
            dataSnapshot => {
                console.log("Updating recent reviews due to value change")
                setRecentReviews(updateRecentReviews(dataSnapshot))
            })
    }
    return (
        <>
            <div>
                <h2>Home Page</h2>
            </div>
            <div>
                Search for a house in Exeter:
                <input type={"text"} onChange={
                    (newQuery) => {
                        console.log("Now searching for property " + newQuery.target.value)
                    }
                }/>
            </div>
            <div>
                <h3>Recent reviews</h3>
                {recentReviews?.map(r => <ReviewBlock review={r}/>)}
            </div>
        </>
    )
}
