import * as React from "react"
import {useState} from "react"
import {IReview} from "../types/IReview";
import {RatingScale} from "./RatingScale";
import {ButtonSelector} from "./ButtonSelector";
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

export const NewReview: (props: { address: string }) => JSX.Element = (props) => {
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
    const [yearOfResidence, setYearOfResidence] = useState<string>()
    const [reviewBody, setReviewBody] = useState<string>()
    const [houseRating, setHouseRating] = useState<number>(0)
    const [estateAgent, setEstateAgent] = useState<string>()
    const [estateAgentRating, setEstateAgentRating] = useState<number>(0)
    const [bedrooms, setBedrooms] = useState<number>(4)

    const [collectingUserDetails, setCollectingUserDetails] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState<string>()
    const [fullName, setFullName] = useState<string>()
    const [emailAddress, setEmailAddress] = useState<string>()

    const [validationErrors, setValidationErrors] = useState<{
        estateAgentRating?: string;
        bedrooms?: string;
        houseRating?: string;
        reviewTitle?: string;
        reviewBody?: string;
        yearOfResidence?: string;
        estateAgent?: string;
    }>({})
    const submit = () => {
        setValidationErrors({})
        if (bedrooms == 0)
            setValidationErrors(prevState => ({
                ...prevState,
                bedrooms: "Please type the number of bedrooms, eg: 4"
            }))
        if (houseRating == 0)
            setValidationErrors(prevState => ({
                ...prevState,
                houseRating: "Please rate the house by clicking on the house stars"
            }))
        if (estateAgentRating == 0)
            setValidationErrors(prevState => ({
                ...prevState,
                estateAgentRating: "Please rate your estate agent by clicking on the house stars"
            }))
        if (!reviewTitle || reviewTitle.length == 0)
            setValidationErrors(prevState => ({
                ...prevState,
                reviewTitle: "Please give your review a title"
            }))
        if (!reviewBody || reviewBody.length == 0)
            setValidationErrors(prevState => ({...prevState, reviewBody: "Please write a review"}))
        if (!yearOfResidence)
            setValidationErrors(prevState => ({
                ...prevState,
                yearOfResidence: "Please select which year you lived in this house"
            }))
        if (estateAgent && estateAgent.length > 100)
            setValidationErrors(prevState => ({
                ...prevState,
                estateAgent: "Please write a shorter estate agent name"
            }))

        setValidationErrors(prevState => {
            console.log(`There are ${Object.keys(prevState).length} validation errors`)
            return (prevState)
        })

        // handleSubmission({
        //     title: reviewTitle,
        //     body: reviewBody,
        //     rating: houseRating,
        //     estateAgent: estateAgent,
        //     estateAgentRating: estateAgentRating,
        //     bedrooms: bedrooms,
        //     date: new Date(),
        //     yearOfResidence: yearOfResidence,
        //     verified: false // to begin with, the review is not verified
        // }, props.address)
    }
    return (
        <div className={"card"}>
            <h3>Write a review</h3>
            <div
                className={"review-element " + (validationErrors.houseRating ? "validation-error-container" : "no-validation-error-container")}>
                <label>Rate this house</label>
                <div>
                    <RatingScale value={houseRating} onChange={r => setHouseRating(r)}/>
                </div>
                {validationErrors?.houseRating &&
                <p className={"validation-error-message"}>{validationErrors.houseRating}</p>}
            </div>
            <div
                className={"review-element " + (validationErrors.reviewTitle ? "validation-error-container" : "no-validation-error-container")}>
                <label>Give your review a title</label>
                <div className={"text-input-wrapper"}>
                    <input type={"text"} onChange={c => {
                        setReviewTitle(c.target.value)
                    }} placeholder={"Great house for students"}/>
                </div>
                {validationErrors?.reviewTitle &&
                <p className={"validation-error-message"}>{validationErrors.reviewTitle}</p>}
            </div>
            <div
                className={"review-element " + (validationErrors.reviewBody ? "validation-error-container" : "no-validation-error-container")}>
                <label>Give us the details...</label>
                <div className={"text-input-wrapper"}>
                    <textarea onChange={c => {
                        setReviewBody(c.target.value)
                    }} rows={10}
                              placeholder={`Include details about\n - the condition\n - how modern is it?\n - whats the location like?`}/>
                </div>
                {validationErrors?.reviewBody &&
                <p className={"validation-error-message"}>{validationErrors.reviewBody}</p>}
            </div>
            <div
                className={"review-element " + (validationErrors.yearOfResidence ? "validation-error-container" : "no-validation-error-container")}>
                <label>Which year did you live here?</label>
                <div>
                    <ButtonSelector options={yearOfResidenceOptions} value={yearOfResidence}
                                    onChange={y => setYearOfResidence(y)}/>
                </div>
                {validationErrors?.yearOfResidence &&
                <p className={"validation-error-message"}>{validationErrors.yearOfResidence}</p>}
            </div>
            <div
                className={"review-element " + (validationErrors.estateAgent ? "validation-error-container" : "no-validation-error-container")}>
                <label>Which estate agent managed the property?</label>
                <div className={"text-input-wrapper"}>
                    <input type={"text"} onChange={c => {
                        setEstateAgent(c.target.value)
                    }} placeholder={"Cardens"}/>
                </div>
                {validationErrors?.estateAgent &&
                <p className={"validation-error-message"}>{validationErrors.estateAgent}</p>}
            </div>
            <div
                className={"review-element " + (validationErrors.estateAgentRating ? "validation-error-container" : "no-validation-error-container")}>
                <label>Rate your estate agent</label>
                <div>
                    <RatingScale value={estateAgentRating} onChange={r => setEstateAgentRating(r)}/>
                </div>
                {validationErrors?.estateAgentRating &&
                <p className={"validation-error-message"}>{validationErrors.estateAgentRating}</p>}
            </div>
            <div
                className={"review-element " + (validationErrors.bedrooms ? "validation-error-container" : "no-validation-error-container")}>
                <label>How many bedrooms does this house have?</label>
                <div>
                    <button className={"increment"}
                            onClick={() => setBedrooms(prevState => prevState - 1)}>-
                    </button>
                    <input type={"text"} onChange={c => {
                        if (!isNaN(Number(c.target.value))) // will not accept anything but numbers
                            setBedrooms(Number(c.target.value))
                    }} placeholder={"4"} value={bedrooms} inputMode={"numeric"}/>
                    <button className={"increment"}
                            onClick={() => setBedrooms(prevState => prevState + 1)}>+
                    </button>
                </div>
                {validationErrors?.bedrooms &&
                <p className={"validation-error-message"}>{validationErrors.bedrooms}</p>}

            </div>
            <button onClick={submit}>Submit review!</button>
        </div>
    )
}


const handleSubmission = (review: IReview, address: string) => {
    const uploadToDatabase = () => {
        firebase.database()
            .ref(`/reviews/${address}/${firebase.auth().currentUser.uid}`)
            .set(review)
            .then(() => console.log("Review uploaded to database (show a success toast)"))
    }
    console.log("Uploading review to database:")
    console.log(review)
    // show a confirmation screen to check the review
    // show a screen to enter personal details


    // to send the review into the database
    if (firebase.auth().currentUser === null) {
        firebase.auth().signInAnonymously()
            .then((userCredential) => {
                uploadToDatabase()// get user ID from temp anonymous sign in
            })
    } else {
        uploadToDatabase()
    }
}

