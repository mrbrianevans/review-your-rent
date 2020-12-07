import firebase from "firebase/app";
import 'firebase/analytics'
import * as React from "react";
import {useEffect, useState} from "react";

export const VerifySignUpLink = () => {

    const [emailAddress, setEmailAddress] = useState<string>(window.localStorage.getItem("emailAddress") || "")

    useEffect(() => {
        if (window.localStorage.getItem("emailAddress"))
            performSignIn(window.localStorage.getItem("emailAddress"))
    }, [])

    const [validationErrors, setValidationErrors] = useState<{
        emailAddress?: string;
        page?: string;
    }>({})
    const [signUpSuccess, setSignUpSuccess] = useState(false)
    const performSignIn = (emailAddress: string) => {

        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // this should confirm the email address
            firebase.auth().signInWithEmailLink(emailAddress)
                .then(u => {
                    console.log("Accepted verification, redirect to remove query")
                    setSignUpSuccess(true)
                    setTimeout(redirectToFreshPage, 2000)
                    const studentDbEntry = firebase.database().ref("students").child(u.user.uid)
                    studentDbEntry.child("verified").set(true)
                    studentDbEntry.child("dateVerified").set(new Date().valueOf())
                    firebase.analytics().logEvent('sign_up', {method: 'email_link'})
                })
                .catch((reason => {
                    console.log("Rejected due to")
                    console.log(reason)
                    setValidationErrors(prevState => ({
                        ...prevState,
                        emailAddress: reason.message
                    }))
                }))
        } else {
            setValidationErrors(prevState => ({
                ...prevState,
                page: "Something went wrong. Please click the link in your email again..."
            }))
        }
    }

    return (
        <div className={"card"}>
            <h3>Final step</h3>

            {validationErrors?.page &&
            <p className={"validation-error-message"}>{validationErrors.page}</p>}
            {signUpSuccess ? <>
                <p className={"success-message"}>
                    You have successfully submitted a review.
                    Thank you for your contribution
                </p></> : <>
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
                    performSignIn(emailAddress)
                }
                }>Confirm
                </button>
            </>
            }
        </div>
    )
}

const redirectToFreshPage = () => {
    window.location.href = window.location.origin + window.location.pathname
}
