import * as React from "react"
import {useState} from "react"
import {IReview} from "../types/IReview";
import {RatingScale} from "./RatingScale";
import {ButtonSelector} from "./ButtonSelector";
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

export const NewReview = () => {
    // inputs:
    // - review title (summary)
    // - year lived at address (drop down or buttons?)
    // - review of the house
    // - rate the house
    // - which estate agent?
    // - rate the estate agent
    // - how many bedrooms does this house have? how many people did you live with?
    const [reviewTitle, setReviewTitle] = useState<string>()
    const yearOfResidenceOptions: string[] = ["2018-2019", "2019-2020", "2020-2021"]
    const [yearOfResidence, setYearOfResidence] = useState<string>(yearOfResidenceOptions[1])
    const [reviewBody, setReviewBody] = useState<string>()
    const [houseRating, setHouseRating] = useState<number>(0)
    const [estateAgent, setEstateAgent] = useState<string>()
    const [estateAgentRating, setEstateAgentRating] = useState<number>(0)
    const [bedrooms, setBedrooms] = useState<number>(4)

    const [collectingUserDetails, setCollectingUserDetails] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState<string>()
    const [fullName, setFullName] = useState<string>()
    const [emailAddress, setEmailAddress] = useState<string>()
    const submit = () => {
        handleSubmission({
            title: reviewTitle,
            body: reviewBody,
            rating: houseRating,
            estateAgent: estateAgent,
            estateAgentRating: estateAgentRating,
            bedrooms: bedrooms,
            date: new Date(),
            yearOfResidence: yearOfResidence,
            verified: false // to begin with, the review is not verified
        })
    }
    return (
        <div className={"card"}>
            <h3>Write a review</h3>
            <div>
                <label>Rate this house</label>
                <div>
                    <RatingScale value={houseRating} onChange={r => setHouseRating(r)}/>
                </div>
            </div>
            <div>
                <label>Give your review a title</label>
                <div>
                    <input type={"text"} onChange={c => {
                        setReviewTitle(c.target.value)
                    }} placeholder={"Great house for students"}/>
                </div>
            </div>
            <div>
                <label>Give us the details...</label>
                <div>
                    <textarea onChange={c => {
                        setReviewBody(c.target.value)
                    }} rows={10}
                              placeholder={`Include details about\n - the condition\n - how modern is it?\n - whats the location like?`}/>
                </div>
            </div>
            <div>
                <label>Which year did you live here?</label>
                <div>
                    <ButtonSelector options={yearOfResidenceOptions} value={yearOfResidence}
                                    onChange={y => setYearOfResidence(y)}/>
                </div>
            </div>
            <div>
                <label>Which estate agent managed the property?</label>
                <div>
                    <input type={"text"} onChange={c => {
                        setEstateAgent(c.target.value)
                    }} placeholder={"Cardens"}/>
                </div>
            </div>
            <div>
                <label>Rate your estate agent</label>
                <div>
                    <RatingScale value={estateAgentRating} onChange={r => setEstateAgentRating(r)}/>
                </div>
            </div>
            <div>
                <label>How many bedrooms does this house have?</label>
                <div>
                    <button className={"increment"}
                            onClick={() => setBedrooms(prevState => prevState - 1)}>-
                    </button>
                    <input type={"text"} onChange={c => {
                        setBedrooms(Number(c.target.value))
                    }} placeholder={"4"} value={bedrooms} inputMode={"numeric"}/>
                    <button className={"increment"}
                            onClick={() => setBedrooms(prevState => prevState + 1)}>+
                    </button>
                </div>
            </div>
            <button onClick={submit}>Submit review!</button>
        </div>
    )
}


const handleSubmission = (review: IReview) => {

    console.log("Uploading review to database:")
    console.log(review)
    // validate the input
    // show a confirmation screen to check the review
    // show a screen to enter personal details

    // get user ID from temp anonymous sign in
    // to send the review into the database
    firebase.auth().signInAnonymously()
        .then((userCredential) => {
            console.log(firebase.auth().currentUser.uid) // this is the key to store the review under in the database
        })
}

