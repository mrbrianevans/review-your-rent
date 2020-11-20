import * as React from "react"
import firebase from "firebase/app";
import 'firebase/database'
import {useState} from "react";
import ReviewBlock from "../components/ReviewBlock";
import {firebaseConfig} from '../firebaseConfig'


const initialiseFirebaseApp = () => {
    console.log("Initialising firebase app. Length: "+firebase.apps.length)
    firebase.initializeApp(firebaseConfig)
}

if(firebase.apps.length === 0)
    initialiseFirebaseApp()

// get the five most recent reviews
const getRecentReviews: () => Promise<IReview[]> = () => {
    let reviews: IReview[] = []
    return firebase.database().ref("/reviews/").limitToFirst(5).once('value')
          .then(allReviews=>{
              allReviews.val() && allReviews.forEach((houseReviews)=>{
                let houseAddress = houseReviews.key
                houseReviews.forEach(review=>{
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
          })
}
export const HomePage = () => {
    const [recentReviews, setRecentReviews] = useState<IReview[]>()
    const [hasCalledRecentReviews, setCalledRecentReviews] = useState(false)
    if(!hasCalledRecentReviews) {
        setCalledRecentReviews(true)
        getRecentReviews().then(r => setRecentReviews(r))
    }
    return (
        <>
            <div>
                I am home page
            </div>
            <div>
                <h3>Recent reviews</h3>
                {recentReviews?.map(r=><ReviewBlock review={r}/>)}
            </div>
        </>
    )
}