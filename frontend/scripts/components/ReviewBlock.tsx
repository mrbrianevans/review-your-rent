/// <reference path="../types/IReview.ts" />
// import * as React from "react";

const ReviewBlock: (reviewData: IReview) => JSX.Element = (reviewData) =>
    <div>
        <p>{reviewData.title}</p>
        <p>
            {reviewData.body}
        </p>
    </div>


