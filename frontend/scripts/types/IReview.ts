export interface IReview {
    title: string,
    body: string,
    date: Date,
    rating: number,
    estateAgent: string,
    estateAgentRating: number,
    bedrooms: number,
    reviewer?: string,
    yearOfResidence?: string, // eg 2019-2020,
    verified: boolean
}

export interface IRecentReview {
    address: string,
    title: string,
    reviewer: string,
    rating: number,
    date: Date,
    body: string
}
