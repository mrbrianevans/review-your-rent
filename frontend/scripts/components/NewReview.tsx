import * as React from "react"
import {useState} from "react"

export const NewReview = () => {
    // inputs:
    // - review title (summary)
    // - year lived at address (drop down or buttons?)
    // - review of the house
    // - rate the house
    // - which estate agent?
    // - rate the estate agent
    // - how many bedrooms does this house have? how many people did you live with?
    const [reviewTitle, setReviewTitle] = useState<string>()
    const [yearOfResidence, setYearOfResidence] = useState<string>()
    const [reviewBody, setReviewBody] = useState<string>()
    const [houseRating, setHouseRating] = useState<number>()
    const [estateAgent, setEstateAgent] = useState<string>()
    const [estateAgentRating, setEstateAgentRating] = useState<number>()
    const [bedrooms, setBedrooms] = useState<number>()
    return (
        <div className={"card"}>
            <h3>Write a review</h3>
            <div>
                <label>Give your review a title</label>
                <div>
                    <input type={"text"} onChange={c => {
                        setReviewTitle(c.target.value)
                    }} placeholder={"Great house for students"}/>
                </div>
            </div>
            <div>
                <label>Give us the details...</label>
                <div>
                    <textarea onChange={c => {
                        setReviewBody(c.target.value)
                    }} rows={10}
                              placeholder={`Include details about\n - the condition\n - how modern is it?\n - whats the location like?`}/>
                </div>
            </div>
            <div>
                <label>Which estate agent managed the property?</label>
                <div>
                    <input type={"text"} onChange={c => {
                        setEstateAgent(c.target.value)
                    }} placeholder={"Cardens"}/>
                </div>
            </div>
            {/*<ButtonGroup>*/}
            {/*    <Button>Two years ago</Button>*/}
            {/*    <Button>Last year</Button>*/}
            {/*    <Button>This year</Button>*/}
            {/*</ButtonGroup>*/}
            <button>Submit review!</button>
            <p>Submission doesn't yet do anything...</p>
        </div>
    )
}
