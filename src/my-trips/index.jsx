/* eslint-disable no-unused-vars */
import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

const navigate = useNavigate();
const [userTrips,setUserTrips]=useState([]);

    useEffect(()=>{
    GetUserTrips();
    },[])

//used get all user trips

const GetUserTrips=async()=>{
    const user=JSON.parse(localStorage.getItem('user'));
   
    if(!user)
    {
        navigate('/');
        return;
    }

const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
const querySnapshot = await getDocs(q);
    setUserTrips([]);
querySnapshot.forEach((doc) => {
console.log(doc.id, " => ", doc.data());
  setUserTrips(preVal=>[...preVal,doc.data()])
    });
}
  return (
      <div className=' sm:px-10 md:px-32  lg:px-56 xl:px10 px-10 mt-10'>
        <h2 className='font-bold text-3xl'>MyTrips</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10 '>
            {userTrips?.length>0?userTrips.map((trip,index)=>(
                <UserTripCardItem trip={trip} key={index}  />
            ))
            :[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[250px] w-full bg-slate-300 animate-pulse rounded-xl'>
               
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default MyTrips