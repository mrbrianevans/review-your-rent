import * as React from "react";
import {Link} from 'react-router-dom'

const ReviewBlock: (reviewData: { review: IReview }) => JSX.Element = (props) =>
    <div className={"card"}>
        <p><b>House:</b> <Link
            to={`/property/${props.review.address}`}>{props.review.address}</Link></p>
        <p>{props.review.title}</p>
        <p>
            {props.review.body}
        </p>
        <p>
            by - <span className={"reviewer-name"}>{props.review.reviewer}</span>
        </p>

    </div>


export default ReviewBlock
