import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/analytics'
import * as React from "react";
import {useState} from "react";

export const SignUp = () => {
    const [validationErrors, setValidationErrors] = useState<{
        emailAddress?: string;
    }>({})
    const [fullName, setFullName] = useState<string>(window.localStorage.getItem("fullName") || '')
    const [emailAddress, setEmailAddress] = useState<string>(window.localStorage.getItem("emailAddress") || '')
    const [linkSent, setLinkSent] = useState<boolean>(false)
    return (
        <div>
            <h3>Verify you are a student</h3>
            {linkSent ? <>
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
                console.log(window.location)
                // this should validate the email address
                if (emailAddress.match(/[a-z]{2,3}[0-9]{3}@exeter.ac.uk$/) || true) {
                    console.log("Sending email link...")
                    window.localStorage.setItem("emailAddress", emailAddress)
                    window.localStorage.setItem("fullName", fullName)
                    firebase.database().ref("students").child(firebase.auth().currentUser.uid).update({
                        emailAddress: emailAddress,
                        fullName: fullName,
                        verified: false,
                        dateSignedUp: new Date().valueOf()
                    }).then(() => {
                        console.log("User details added to database")
                    })
                    firebase.database().ref("students").off()
                    const actionCodeSettings: firebase.auth.ActionCodeSettings = {
                        // the link returns to this page, but adds the verify query
                        url: `${window.location.origin + window.location.pathname}?verify=true`,
                        handleCodeInApp: true
                    }
                    firebase.auth().sendSignInLinkToEmail(emailAddress, actionCodeSettings)
                        .then(() => console.log(`Sent email to ${emailAddress}`))
                        .then(() => {
                            setLinkSent(true)
                        })
                        .catch((reason: { code: string, message: string }) => {
                            console.log("Could not send an email")
                            console.log(reason)
                            setValidationErrors(prevState => ({
                                ...prevState,
                                emailAddress: reason.message
                            }))
                        })
                } else {
                    setValidationErrors(prevState => ({
                        ...prevState,
                        emailAddress: "Please enter a valid student university of Exeter email address like rar305@exeter.ac.uk"
                    }))
                }
            }
            }>Verify
            </button>
                <p>This will send a link to {emailAddress}</p>
            </> : <>
                <p className={"info-message"}>
                    {/* Todo: This should watch database and update if they verify in another browser */}
                    Link sent. Check your university email
                </p>
            </>}

        </div>
                )
                }
