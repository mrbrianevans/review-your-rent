import * as React from "react";
import {IReview} from "../types/IReview";

const ReviewBlock: (reviewData: { review: IReview }) => JSX.Element = (props) =>
    <div className={"card"}>
        <p><b>{props.review.title}</b>({props.review.rating}/5)</p>
        <p>
            {props.review.body}
        </p>
        {props.review.reviewer && props.review.reviewer.length &&
        <p>
            by - <span className={"reviewer-name"}>{props.review.reviewer || ''}</span>
        </p>}

    </div>


export default ReviewBlock
