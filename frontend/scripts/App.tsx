/// <reference path="components/ReviewBlock.tsx" />
// import * as React from "react";

const App: () => JSX.Element = () =>
    <ReviewBlock
        title={"My house"}
        stars={5}
        body={"Very long review"}
        reviewer={"Me"}
        date={new Date(2020, 11, 11)}/>
