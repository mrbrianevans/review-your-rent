import * as React from "react";
import {useState} from "react";
import Card from "reactstrap/lib/Card";
import CardTitle from "reactstrap/lib/CardTitle";
import CardBody from "reactstrap/lib/CardBody";
import CardLink from "reactstrap/lib/CardLink";

const HouseDetails = () => {
    const [viewMore, setViewMore] = useState(false)

    return (
        <Card>
            <CardTitle>House names</CardTitle>
            <CardBody>
                <p>House details</p>
                {viewMore ?
                    <div>
                        <p>Even more details</p>
                        <CardLink onClick={() => {
                            setViewMore(false)
                        }} href={"#"}>Hide details</CardLink>
                    </div>
                    :
                    <CardLink onClick={() => {
                        setViewMore(true)
                    }} href={"#"}>View more</CardLink>}
            </CardBody>

        </Card>
    );
}

export default HouseDetails
