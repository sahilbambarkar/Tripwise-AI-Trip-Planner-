export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo travels in exploration',
        icon:'🌏',
        people:'1 Person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two travels in tandem',
        icon: '👫',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group fun lovind adventures',
        icon: '👪',
        people: '3 to 5 People' 
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '✈',
        people: '5 or more People'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay Conscious of cost',
        icon: '💵', 
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    }, {
        id: 1,
        title: 'Luxury',
        desc: 'Don`t worry  about cost',
        icon: '🪙',
    },
]


export const AI_PROMPT ='Generate Travel Plan for Location:{location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} Days with each day plan with best time to visit in JSON format.'