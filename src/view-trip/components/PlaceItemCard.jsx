/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { GetPlaceDetails, PHOTOS_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function PlaceCardItem({ place }) {
    const [PhotoUrl, setPhotoUrl] = useState(' /placeholder.png');  // if no image is available from api

    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])


    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTOS_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }
    const defaultTicketPricing = "Pay as you go"; 
    const defaultRating = "Not rated"; 

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank' >
            <div className='shadow-md border rounded-xl p-3  flex gap-5  hover:scale-105 transition-all hover:shadow-sm cursor-pointer'>
                <img src= {PhotoUrl}className='w-[120px] h-[120px] rounded-xl object-cover' />
                <div>
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                    <h2 className='mt-2'>🤑{place.ticketPricing || defaultTicketPricing }</h2>
                    <h2 className='mt-2'>🌟{place.rating || defaultRating}</h2>


                    {/*<Button><FaMapLocationDot /></Button>*/}
                </div>
            </div>
        </Link>

    )
}

export default PlaceCardItem