/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { useEffect } from 'react';
import { PHOTOS_REF_URL } from '@/service/GlobalApi';


function InfoSection({ trip }) {

    const [PhotoUrl, setPhotoUrl] = useState('/placeholder.png');  // if no image is available from api

    useEffect(()=>{
     trip&&GetPlacePhoto();
    },[ trip])
    

    const GetPlacePhoto=async()=>{
        const data={
          textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
           console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTOS_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }
    return (
        <div>
            <img src={PhotoUrl} className='w-full h-[340px] object-cover rounded-xl ' />
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-2 my-5'>
                    <h2 className='font-bold text-xl'>{trip?.userSelection?.location?.label}</h2>

                    <div className='flex gap-2'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-md '>📆{trip.userSelection?.numberofdays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-md '>💸{trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-md  '>🍾No. of Traveler: {trip.userSelection?.traveler} </h2>

                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>

    )
}

export default InfoSection