import * as React from "react";

const ReviewBlock: (reviewData: { review: IReview }) => JSX.Element = (props) =>
    <div className={"review-block"}>
        <p>{props.review.address}</p>
        <p>{props.review.title}</p>
        <p>
            {props.review.body}
        </p>
        <p>
            by - <span className={"reviewer-name"}>{props.review.reviewer}</span>
        </p>

    </div>


export default ReviewBlock
