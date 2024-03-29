import * as React from "react"
import {useState} from "react"
import {useParams} from 'react-router-dom'
import firebase from "firebase/app";
import 'firebase/database'
import ReviewBlock from "../components/ReviewBlock";
import {PageTitle} from "../components/PageTitle";
import {SubTitle} from "../components/SubTitle";
import {IAddress} from "../types/IAddress";
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
    const [houseDetails, setHouseDetails] = useState<IPropertyDetails | undefined>()
    const getHouseInformation = (houseId) => {
        houseId = houseId.replace('.', '')
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

    return (
        <>
            <div>
                <PageTitle title={houseDetails?.primary_address}/>
                <div>
                    <SubTitle subtitle={"Details"}/>
                    <PropertyDetails property={houseDetails}/>
                </div>
                <div>
                    <SubTitle subtitle={"Reviews"}/>
                    {houseReviews ? houseReviews.map((r, i) => <ReviewBlock review={r} key={i}/>) :
                        <p>Loading...</p>}
                </div>
            </div>
        </>
    )
}

const PropertyDetails: (props: { property: IPropertyDetails | undefined }) => JSX.Element = (props) =>
    <div className={"review-block"}>
        <p><b>Distance from uni:</b> {props.property?.distance_from_uni}m</p>
        <p><b>Number of bedrooms:</b> {props.property?.bedrooms}</p>
        <p><b>Post code:</b> {props.property?.terms.post_code}</p>
        <p><b>Area:</b> {props.property?.secondary_address}</p>
    </div>

interface IPropertyDetails extends IAddress {
    bedrooms?: number;
}
