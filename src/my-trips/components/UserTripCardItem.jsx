/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { GetPlaceDetails, PHOTOS_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function UserTripCardItem({trip}) {
    const [PhotoUrl, setPhotoUrl] = useState('/placeholder.png');  // if no image is available from api

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])


    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTOS_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
          <img src={PhotoUrl} 
          className='object-cover rounded-xl h-[280px] w-[280px]'/>
          <div>
            <h2 className='font-bold text-xl'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.numberofdays} Days trip with {trip?.userSelection?.budget} Budget</h2>
          </div>
    </div>
  </Link>
  )
}

export default UserTripCardItem