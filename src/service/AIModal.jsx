
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


  export   const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
            {
                role: "user",
                parts: [
                    { text: "\nGenerate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format." },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "```json\n{\n  \"hotels\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100/night\",\n      \"imageUrl\": \"https://images.trvl-media.com/hotels/2000000/1900000/1898000/1897400/1897423.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1424\",\n      \"rating\": 4,\n      \"description\": \"A downtown hotel with a retro vibe, offering affordable rooms, a casino, and live entertainment.\"\n    },\n    {\n      \"name\": \"The Golden Nugget\",\n      \"address\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$70-$150/night\",\n      \"imageUrl\": \"https://media.timeout.com/images/103130984/image.jpg\",\n      \"geoCoordinates\": \"36.1693, -115.1430\",\n      \"rating\": 4.5,\n      \"description\": \"A historic hotel known for its impressive atrium, shark tank, and various dining and entertainment options.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80/night\",\n      \"imageUrl\": \"https://media.timeout.com/images/103131025/image.jpg\",\n      \"geoCoordinates\": \"36.1127, -115.1716\",\n      \"rating\": 3.5,\n      \"description\": \"A family-friendly hotel with a circus theme, featuring a midway, a casino, and various restaurants.\"\n    },\n    {\n      \"name\": \"The Strat Hotel, Casino & SkyPod\",\n      \"address\": \"2000 S Las Vegas Blvd, Las Vegas, NV 89104\",\n      \"price\": \"$60-$120/night\",\n      \"imageUrl\": \"https://media.timeout.com/images/103131079/image.jpg\",\n      \"geoCoordinates\": \"36.1197, -115.1695\",\n      \"rating\": 4,\n      \"description\": \"A hotel with a towering observation deck offering panoramic views of the city, along with a casino, restaurants, and entertainment.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"plan\": [\n        {\n          \"time\": \"9:00 AM - 12:00 PM\",\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian-only street with a canopy of lights and free live entertainment.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Fremont_Street_Experience_Las_Vegas_02.jpg/1280px-Fremont_Street_Experience_Las_Vegas_02.jpg\",\n          \"geoCoordinates\": \"36.1699, -115.1424\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5\n        },\n        {\n          \"time\": \"12:00 PM - 2:00 PM\",\n          \"placeName\": \"Heart Attack Grill\",\n          \"placeDetails\": \"A restaurant known for its extreme food and unhealthy menu.\",\n          \"placeImageUrl\": \"https://www.tripadvisor.com/Tourism-g45963-Attractions-Las_Vegas_Nevada.html\",\n          \"geoCoordinates\": \"36.1684, -115.1427\",\n          \"ticketPricing\": \"Lunch/Dinner\",\n          \"rating\": 4\n        },\n        {\n          \"time\": \"2:00 PM - 5:00 PM\",\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"A museum displaying historic neon signs from Las Vegas.\",\n          \"placeImageUrl\": \"https://www.tripadvisor.com/Tourism-g45963-Attractions-Las_Vegas_Nevada.html\",\n          \"geoCoordinates\": \"36.1714, -115.1513\",\n          \"ticketPricing\": \"$20\",\n          \"rating\": 4.5\n        },\n        {\n          \"time\": \"5:00 PM - 7:00 PM\",\n          \"placeName\": \"Golden Nugget\",\n          \"placeDetails\": \"A historic hotel with a casino and a famous shark tank.\",\n          \"placeImageUrl\": \"https://media.timeout.com/images/103130984/image.jpg\",\n          \"geoCoordinates\": \"36.1693, -115.1430\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5\n        },\n        {\n          \"time\": \"7:00 PM - 9:00 PM\",\n          \"placeName\": \"Dinner at a cheap restaurant on Fremont Street\",\n          \"placeDetails\": \"There are many options for affordable dining on Fremont Street.\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"plan\": [\n        {\n          \"time\": \"9:00 AM - 12:00 PM\",\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"A free attraction featuring a stunning display of flowers and plants.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/images/default-source/bellagio-conservatory-and-botanical-garden/conservatory-images/conservatory-images-3.jpg\",\n          \"geoCoordinates\": \"36.1145, -115.1740\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5\n        },\n        {\n          \"time\": \"12:00 PM - 2:00 PM\",\n          \"placeName\": \"Lunch at a food court on the Strip\",\n          \"placeDetails\": \"Several casinos offer affordable food court options.\"\n        },\n        {\n          \"time\": \"2:00 PM - 5:00 PM\",\n          \"placeName\": \"Fountains of Bellagio\",\n          \"placeDetails\": \"A free show featuring synchronized water, lights, and music.\",\n          \"placeImageUrl\": \"https://media.timeout.com/images/103131075/image.jpg\",\n          \"geoCoordinates\": \"36.1145, -115.1740\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5\n        },\n        {\n          \"time\": \"5:00 PM - 7:00 PM\",\n          \"placeName\": \"Explore the Strip\",\n          \"placeDetails\": \"Walk along the Strip and admire the architecture and atmosphere.\"\n        },\n        {\n          \"time\": \"7:00 PM - 9:00 PM\",\n          \"placeName\": \"Dinner at a buffet\",\n          \"placeDetails\": \"Many casinos offer affordable buffets with a wide variety of food.\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"plan\": [\n        {\n          \"time\": \"9:00 AM - 12:00 PM\",\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic area with hiking trails, rock formations, and stunning views.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/learn/nature/images/redrock-canyon-overview_2.jpg\",\n          \"geoCoordinates\": \"36.1795, -115.3097\",\n          \"ticketPricing\": \"$15 per vehicle\",\n          \"rating\": 4.5\n        },\n        {\n          \"time\": \"12:00 PM - 2:00 PM\",\n          \"placeName\": \"Lunch at a local restaurant in the area\",\n          \"placeDetails\": \"There are various dining options around Red Rock Canyon.\"\n        },\n        {\n          \"time\": \"2:00 PM - 5:00 PM\",\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A historic dam with tours and views of the Colorado River.\",\n          \"placeImageUrl\": \"https://www.nps.gov/articles/000/images/hoover-dam-1.jpg\",\n          \"geoCoordinates\": \"36.0035, -114.7952\",\n          \"ticketPricing\": \"$30 for a tour\",\n          \"rating\": 4.5\n        },\n        {\n          \"time\": \"5:00 PM - 7:00 PM\",\n          \"placeName\": \"Dinner at a restaurant near Hoover Dam\",\n          \"placeDetails\": \"There are several options for dining near Hoover Dam.\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Notes:**\n\n* This itinerary is a suggestion and can be customized based on your interests and preferences.\n* Ticket prices are subject to change and may vary depending on the time of year and availability.\n* Be sure to check the opening hours and ticket prices for each attraction before visiting.\n* Public transportation is available in Las Vegas, but walking or taking taxis may be more convenient for getting around the Strip.\n* Consider using coupons and discounts to save money on food, drinks, and attractions.\n* Dress comfortably and be prepared for hot weather.\n* Stay hydrated and wear sunscreen, especially during the day.\n* Keep your belongings safe and be aware of your surroundings.\n\nThis plan focuses on free or low-cost attractions, emphasizing exploring the city's free attractions like Fremont Street, the Bellagio Conservatory, and the Fountains of Bellagio. The itinerary balances exploring the Strip with visiting nearby attractions like Red Rock Canyon and Hoover Dam.\n\nRemember, Las Vegas is a vibrant city with a diverse range of options, so you can customize your experience based on your preferences and interests. Have a fantastic trip! \n" },
                ],
            },
        ],
    });




