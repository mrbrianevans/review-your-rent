import * as React from "react"
import {useState} from "react"
import {useParams} from 'react-router-dom'
import firebase from "firebase/app";
import 'firebase/database'
import ReviewBlock from "../components/ReviewBlock";
import {PageTitle} from "../components/PageTitle";
import {SubTitle} from "../components/SubTitle";
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
    const [houseDetails, setHouseDetails] = useState<IPropertyDetails>()
    const getHouseInformation = (houseId) => {
        // call the realtime database and retrieve some details about the house, including any reviews
        const connectTime = new Date()
        console.log("Connecting to database")
        firebase.database().ref(`/reviews/`).child(houseId)
            .on('value', (dataSnapshot) => {
                console.log("Value received from database in " + (new Date().valueOf() - connectTime.valueOf()) + "ms")
                setHouseReviews(interpretHouseReviews(dataSnapshot))
            })
        firebase.database().ref(`/houses/`).child(houseId)
            .once('value').then(houseDetailsSnapshot => {
            setHouseDetails({
                area: houseDetailsSnapshot.child("area")?.val(),
                bedrooms: houseDetailsSnapshot.child("bedrooms")?.val(),
                "post-code": houseDetailsSnapshot.child("post-code")?.val(),
                "street-address": houseDetailsSnapshot.child("street-address").val()
            })
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
                <PageTitle title={houseDetails?.["street-address"]}/>
                <div>
                    <SubTitle subtitle={"Details"}/>
                    <PropertyDetails property={houseDetails || {}}/>
                </div>
                <div>
                    <SubTitle subtitle={"Reviews"}/>
                    {houseReviews ? houseReviews.map(r => <ReviewBlock review={r}/>) :
                        <p>Loading...</p>}
                </div>
            </div>
        </>
    )
}

const PropertyDetails: (props: { property: IPropertyDetails }) => JSX.Element = (props) =>
    <div className={"review-block"}>
        <p><b>Area:</b> {props.property?.area}</p>
        <p><b>Number of bedrooms:</b> {props.property?.bedrooms}</p>
        <p><b>Post code:</b> {props.property?.["post-code"]}</p>
    </div>

interface IPropertyDetails {
    bedrooms?: number;
    area?: string,
    'post-code'?: string,
    'street-address'?: string
}
