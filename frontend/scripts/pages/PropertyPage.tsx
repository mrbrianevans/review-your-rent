import * as React from "react"
import {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/analytics'
import ReviewBlock from "../components/ReviewBlock";
import {PageTitle} from "../components/PageTitle";
import {SubTitle} from "../components/SubTitle";
import {IAddress} from "../types/IAddress";
import {NewReview} from "../components/NewReview";
import {IReview} from "../types/IReview";
import {VerifySignUpLink} from "../components/VerifySignUpLink";
import DataSnapshot = firebase.database.DataSnapshot;

const interpretHouseReviews: (allReviews: DataSnapshot) => IReview[] = (houseReviews) => {
    let reviews: IReview[] = []
    houseReviews.forEach(review => {
        reviews.push({
            title: review.child('title').val() || "",
            body: review.child('body').val() || "",
            bedrooms: review.child('bedrooms').val() || 0,
            estateAgent: review.child('estateAgent').val() || "",
            estateAgentRating: review.child('estageAgentRating').val() || 0,
            rating: review.child('rating').val() || 0,
            date: new Date(review.child('date').val()),
            verified: review.child('verified').val() || false
        })
    })
    return reviews
}

export const PropertyPage: () => JSX.Element = () => {
    const [houseReviews, setHouseReviews] = useState<IReview[]>()
    const {houseId} = useParams()
    const [houseDetails, setHouseDetails] = useState<IPropertyDetails | undefined>()

    useEffect(() => {
        firebase.analytics().logEvent('page_view', {
            page_title: houseId,
            page_path: window.location.pathname
        })
    })

    const getHouseInformation = (houseId) => {
        houseId = houseId.replace('.', '')
        // call the realtime database and retrieve some details about the house, including any reviews
        const connectTime = new Date()
        console.log("Connecting to database")
        firebase.database().ref(`/reviews/`).child(houseId)
            .orderByChild('verified').equalTo(true)
            .once('value', (dataSnapshot) => {
                console.log("house review received from database in " + (new Date().valueOf() - connectTime.valueOf()) + "ms")
                setHouseReviews(interpretHouseReviews(dataSnapshot))
            })
        firebase.database().ref(`/houses/`).child(houseId)
            .once('value', houseDetailsSnapshot => {
                console.log("house details received from database in " + (new Date().valueOf() - connectTime.valueOf()) + "ms")
                setHouseDetails({
                    secondary_address: houseDetailsSnapshot.child("secondary_address")?.val(),
                    bedrooms: houseDetailsSnapshot.child("bedrooms")?.val(),
                    terms: {
                        street_number: houseDetailsSnapshot.child("terms").child("street_number")?.val(),
                        street: houseDetailsSnapshot.child("terms").child("street")?.val(),
                        town: houseDetailsSnapshot.child("terms").child("town")?.val(),
                        post_code: houseDetailsSnapshot.child("terms").child("post_code")?.val(),
                        county: houseDetailsSnapshot.child("terms").child("county")?.val(),
                        region: houseDetailsSnapshot.child("terms").child("region")?.val(),
                        country: houseDetailsSnapshot.child("terms").child("country")?.val(),
                    },
                    primary_address: houseDetailsSnapshot.child("primary_address").val(),
                    place_id: houseDetailsSnapshot.child("place_id").val(),
                    distance_from_uni: Number(houseDetailsSnapshot.child("distance_from_uni").val())
                })
            })
    }

    const [hasCalledDatabase, setCalledDatabase] = useState(false)
    if (!hasCalledDatabase) {
        setCalledDatabase(true)
        getHouseInformation(houseId)
    }
    // this gets the address from the URL while it waits for the database to respond
    // this ensures that there is immediately a title when the page loads
    // and after the database responds, the title is updated to be 100% correct
    // most of the time the URL should be good enough, if not the exact same as the the database
    const tempAddressTitle = decodeURI(window.location.pathname.match(/\/property\/(.*)/)[1])
    const [writingNewReview, setWritingNewReview] = useState(false)
    return (
        <>
            <div>
                <PageTitle title={houseDetails?.primary_address || tempAddressTitle}/>
                <div>
                    <SubTitle subtitle={"Details"}/>
                    <PropertyDetails property={houseDetails}/>
                </div>
                <div>
                    <SubTitle subtitle={"Reviews"}/>
                    {window.location.search.match(/verify=true/i) &&
                    <VerifySignUpLink/>
                    }
                    {!writingNewReview &&
                    <button onClick={() => {
                        setWritingNewReview(true)
                        window.location.hash = "write-new-review-button"
                    }} id={"write-new-review-button"} className={"pill"}>Write a review</button>}
                    {writingNewReview &&
                    <NewReview address={houseDetails?.primary_address || tempAddressTitle}/>}
                    {writingNewReview &&
                    <button onClick={() => setWritingNewReview(false)} className={"pill"}>Cancel
                        review</button>}
                    {houseReviews ? houseReviews.map((r, i) => <ReviewBlock review={r} key={i}/>) :
                        <p>Loading...</p>}
                </div>
            </div>
        </>
    )
}

const PropertyDetails: (props: { property: IPropertyDetails | undefined }) => JSX.Element = (props) =>
    <div className={"card"}>
        <p><b>Distance from uni:</b> {props.property?.distance_from_uni}m</p>
        <p><b>Number of bedrooms:</b> {props.property?.bedrooms}</p>
        <p><b>Post code:</b> {props.property?.terms.post_code}</p>
        <p><b>Area:</b> {props.property?.secondary_address}</p>
    </div>

interface IPropertyDetails extends IAddress {
    bedrooms?: number;
}
