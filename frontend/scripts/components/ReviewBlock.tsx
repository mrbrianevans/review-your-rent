import * as React from "react";

const ReviewBlock: (reviewData: IReview) => JSX.Element = (reviewData) =>
    <div className={"review-block"}>
        <p>{reviewData.title}</p>
        <p>
            {reviewData.body}
        </p>
        <span>by - {reviewData.reviewer}</span>
    </div>


export default ReviewBlock
