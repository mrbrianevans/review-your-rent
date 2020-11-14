import * as React from "react";
import ReviewBlock from "./components/ReviewBlock";
import HouseDetails from "./components/HouseDetails";


const App: () => JSX.Element = () =>
    <>
        <HouseDetails/>
        <br/>
        <ReviewBlock
            title={"My house"}
            stars={5}
            body={"Very long review"}
            reviewer={"Me"}
            date={new Date(2020, 11, 11)}/>
    </>


export default App
