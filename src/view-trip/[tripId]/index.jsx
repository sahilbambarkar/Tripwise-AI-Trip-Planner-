/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Footer from '../components/Footer';
import PlacesToVisit from '../components/PlaceToVisit';


function ViewTrip() {

const {tripId}=useParams();
const [trip,setTrip]=useState([]);


useEffect(()=>{
  tripId&&GetTripData();
},[tripId])


//used to get trip information from firebase.

const GetTripData=async()=>{
    const docRef=doc(db,'AITrips',tripId);
    const docSnap=await getDoc(docRef);


    if(docSnap.exists()){
       console.log("Document:",docSnap.data());
       setTrip(docSnap.data());
    }
  else{
    console.log('No Search Document');
    toast('No Trip Found')
  }
}


  return (
    <div className='p-10 md:px-20 ld:px-44 xl:px-56 '>
        {/*Information Section */}
          <InfoSection trip={trip}/>
          {/*Recommended hotels*/}
          <Hotels trip={trip} />
          {/*daily plan */}
          <PlacesToVisit trip={trip}  />
          {/*footer */}
          <Footer trip={trip} />
         
    </div>
  )
}

export default ViewTrip