/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { PHOTOS_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails } from '@/service/GlobalApi';

function HotelCardItem({hotel}) {
  const [PhotoUrl, setPhotoUrl] = useState('/image.png');  // if no image is available from api

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel])


  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.name
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl = PHOTOS_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.name + "," + hotel?.address} target='_blank' >

      <div className='hover:scale-105 transition-all cursor-pointer' >
        <img src={PhotoUrl} className='rounded-xl h-[200px] w-full object-cover' />
        <div className='my-2 flex flex-col gap-2'>
          <h2 className='font-medium'>{hotel?.name}</h2>
          <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
          <h2 className=' text-sm'>💰{hotel?.price}</h2>
          <h2 className=' text-sm'>✨{hotel?.rating}</h2>

        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem