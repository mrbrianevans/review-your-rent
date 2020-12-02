import * as React from "react"
import {useState} from "react"
import {IReview} from "../types/IReview";
import {RatingScale} from "./RatingScale";
import {ButtonSelector} from "./ButtonSelector";
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'
import ReviewBlock from "./ReviewBlock";

export const NewReview: (props: { address: string }) => JSX.Element = (props) => {
    // inputs:
    // - review title (summary)
    // - year lived at address (drop down or buttons?)
    // - review of the house
    // - rate the house
    // - which estate agent?
    // - rate the estate agent
    // - how many bedrooms does this house have? how many people did you live with?
    const [reviewTitle, setReviewTitle] = useState<string>('')
    const yearOfResidenceOptions: string[] = ["2018-2019", "2019-2020", "2020-2021"]
    const [yearOfResidence, setYearOfResidence] = useState<string>()
    const [reviewBody, setReviewBody] = useState<string>('')
    const [houseRating, setHouseRating] = useState<number>(0)
    const [estateAgent, setEstateAgent] = useState<string>('')
    const [estateAgentRating, setEstateAgentRating] = useState<number>(0)
    const [bedrooms, setBedrooms] = useState<number>(4)

    const [stage, setStage] = useState<'review' | 'preview' | 'signup' | 'thanks'>("review")
    const [displayName, setDisplayName] = useState<string>('')
    const [fullName, setFullName] = useState<string>(window.localStorage.getItem("fullName") || '')
    const [emailAddress, setEmailAddress] = useState<string>(window.localStorage.getItem("emailAddress") || '')

    const [validationErrors, setValidationErrors] = useState<{
        emailAddress?: string;
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
            let numberOfErrors = Object.keys(prevState).length
            console.log(`There are ${numberOfErrors} validation errors`)
            if (numberOfErrors == 0) {
                console.log("Handling submission due to no errors...")
                handleSubmission({
                    title: reviewTitle,
                    body: reviewBody,
                    rating: houseRating,
                    estateAgent: estateAgent || "",
                    estateAgentRating: estateAgentRating,
                    bedrooms: bedrooms,
                    date: new Date(),
                    yearOfResidence: yearOfResidence,
                    verified: firebase.auth().currentUser === null && firebase.auth().currentUser.emailVerified
                    // the review is verified if their email is verified
                }, props.address)
                    // .then(secondPromise=>{secondPromise})
                    .then(() => console.log("received fufulled promise. review should be uploaded by now"))
                    .then(() => setStage("preview"))
            }
            return (prevState)
        })

    }
    return (
        <div className={"card"}>
            {stage == 'review' &&
            <div>
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
                        }} placeholder={"Great house for students"} value={reviewTitle}/>
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
                }} rows={10} value={reviewBody}
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
                        }} placeholder={"Cardens"} value={estateAgent}/>
                    </div>
                    {validationErrors?.estateAgent &&
                    <p className={"validation-error-message"}>{validationErrors.estateAgent}</p>}
                </div>
                <div
                    className={"review-element " + (validationErrors.estateAgentRating ? "validation-error-container" : "no-validation-error-container")}>
                    <label>Rate your estate agent</label>
                    <div>
                        <RatingScale value={estateAgentRating}
                                     onChange={r => setEstateAgentRating(r)}/>
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
                <button onClick={submit} className={"pill"}>Submit review!</button>
            </div>
            }
            {
                stage == "preview" &&
                <div>
                    <h3>Preview</h3>
                    <p>Does this look right?</p>
                    <ReviewBlock review={{
                        title: reviewTitle,
                        body: reviewBody,
                        rating: houseRating,
                        estateAgent: estateAgent || "",
                        estateAgentRating: estateAgentRating,
                        bedrooms: bedrooms,
                        date: new Date(),
                        yearOfResidence: yearOfResidence,
                        reviewer: displayName,
                        verified: firebase.auth().currentUser === null && firebase.auth().currentUser.emailVerified
                        // the review is verified if their email is verified
                    }}/>
                    <div>
                        <label>Enter a display name (first name will do): </label>
                        <div className={"text-input-wrapper"}>
                            <input type={"text"} value={displayName}
                                   onChange={(c) => {
                                       setDisplayName(c.target.value)
                                   }}
                                   placeholder={"Alice"}/>
                        </div>
                    </div>
                    <button className={"pill"} onClick={() => {
                        // by this point the user should be signed in anonymously
                        setStage("review")
                    }}>Edit
                    </button>
                    <button className={"pill"} onClick={() => {
                        // by this point the user should be signed in anonymously
                        if (firebase.auth().currentUser.isAnonymous)
                            setStage("signup")
                        else
                            setStage("thanks")
                    }}>Confirm
                    </button>
                </div>
            }
            {
                stage == "signup" &&
                <div>
                    <h3>Verify you are a student</h3>
                    <div>
                        <label>Full name: </label>
                        <div className={"text-input-wrapper"}>
                            <input type={"text"} value={fullName}
                                   onChange={(c) => {
                                       setFullName(c.target.value)
                                   }}
                                   placeholder={"Alice Smith"}/>
                        </div>
                    </div>
                    <div
                        className={"review-element " + (validationErrors.emailAddress ? "validation-error-container" : "no-validation-error-container")}>
                        <label>Student email address: </label>
                        <div className={"text-input-wrapper"}>
                            <input type={"text"} value={emailAddress}
                                   onChange={(c) => {
                                       setEmailAddress(c.target.value)
                                   }}
                                   placeholder={"rar305@exeter.ac.uk"}/>
                        </div>
                        {validationErrors?.emailAddress &&
                        <p className={"validation-error-message"}>{validationErrors.emailAddress}</p>}
                    </div>
                    <button className={"pill"} onClick={() => {
                        // this should validate the email address
                        if (emailAddress.match(/[a-z]{2}[0-9]{3}@exeter.ac.uk$/)) {
                            console.log("Sending email link...")
                            window.localStorage.setItem("emailAddress", emailAddress)
                            window.localStorage.setItem("fullName", fullName)
                            const actionCodeSettings: firebase.auth.ActionCodeSettings = {
                                // the link contains the user and the house address
                                url: `https://review-your-rent.web.app/property/${props.address}?verify=true`,
                                handleCodeInApp: true
                            }
                            firebase.auth().sendSignInLinkToEmail(emailAddress, actionCodeSettings)
                                .then(() => console.log(`Sent email to ${emailAddress}`))
                        } else {
                            setValidationErrors(prevState => ({
                                ...prevState,
                                emailAddress: "Please enter a valid student university of Exeter email address like rar305@exeter.ac.uk"
                            }))
                        }

                    }
                    }>Verify
                    </button>
                    <p>This will send a link to your university email address</p>
                </div>
            }
            {
                stage == "thanks" &&
                <div>
                    <p>So I say thank you for the review, the help you're giving. To all the future
                        students looking. Thank you for the review</p>
                </div>
            }
        </div>
    )
}


const handleSubmission: (review: IReview, address: string) => (Promise<void>) = (review, address) => {
    console.log("handle submission called")
    const uploadToDatabase: () => Promise<void> = () => {
        console.log("Upload to database called")
        return firebase.database()
            .ref(`/reviews/${address}/${firebase.auth().currentUser.uid}`)
            .set({...review, date: review.date.valueOf()})
            .then(() => console.log("Review uploaded to database (show a success toast)"))
    }
    // if (firebase.auth().currentUser === null) {
    //     return firebase.auth().signInAnonymously()
    //         .then(() => uploadToDatabase())
    // } else {
    //     return new Promise<void>(()=>{}).then(()=>uploadToDatabase())
    // }
    // return new Promise<void>(async () => {
    //     console.log("Signing in user if necessary")
    //     if (firebase.auth().currentUser === null)
    //         await firebase.auth().signInAnonymously()
    //     return uploadToDatabase()
    // })
    if (firebase.auth().currentUser === null) {
        console.log("Logging in anonymously")
        return firebase.auth().signInAnonymously()
            .then(() => uploadToDatabase())
    } else {
        return uploadToDatabase()
    }
}

