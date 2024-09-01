import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
const[place,setPlace]=useState();

const [formData, setFormData]=useState([]);
const [openDialog,setOpenDialog]=useState(false);

const[loading,setLoading]=useState(false);
const navigate=useNavigate();
const handleInputChange=(name,value)=>{

   setFormData({
     ...formData,
      [name]:value
   })
}
 useEffect(()=>{
   console.log(formData);
 },[formData])

 const login=useGoogleLogin({
   onSuccess: (codeResp) => GetUserProfile(codeResp),
  onError:(error)=>console.log(error)
 })

 const OnGenerateTrip=async()=>{

    const user= localStorage.getItem('user');

    if(!user)
    { 
      setOpenDialog(true)
      return;
    }

     if (formData?.numberofdays>5&&!formData?.location||!formData?.budget||!formData?.traveler)
     {  
       toast("Please Fill all Details.")
        return;
     }
     setLoading(true)

   const FINAL_PROMPT = AI_PROMPT
   .replace('{location}',formData?.location?.label)
   .replace('{totalDays}',formData?.numberofdays)
   .replace('{traveler}',formData?.traveler)
   .replace('{budget}',formData?.budget)
   .replace('{totalDays}', formData?.numberofdays)

   const result = await chatSession.sendMessage(FINAL_PROMPT);

   console.log(result?.response?.text());
   setLoading(false);
   SaveAITrip(result?.response?.text());
 }

const SaveAITrip=async(TripData)=>{

setLoading(true);
 const user=JSON.parse(localStorage.getItem('user'));
 const docID=Date.now().toString()
  await setDoc(doc(db, "AITrips", docID), {
    userSelection:formData,
    tripData:JSON.parse(TripData),
    userEmail:user?.email,
    id:docID,

  });
  setLoading(false);
  navigate('/view-trip/'+docID)
}

const GetUserProfile=(tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
    headers:{
      Authorization:`Bearer  ${tokenInfo?.access_token}`,
      Accept:'Application/json'

    }
  }).then((resp)=>{
    console.log(resp);
    localStorage.setItem('user',JSON.stringify(resp.data));
    setOpenDialog(false);
    OnGenerateTrip();
  })

}

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px10 px-10 mt-10 '>
          <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕🌴</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide Some Basic Information, and our trip planner will generate customized itinerary based on your preferences</p>

          <div className='mt-20 flex flex-col gap-10'>
             <div>
                <h2 className='my-3 text-xl font-medium'> What is Destination of your choice?</h2>
                  <GooglePlacesAutocomplete
                      apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                      selectProps={{
                       place,
                          onChange: (v) => { setPlace(v); handleInputChange('location',v) }
                       
                      }}
                  />
             </div>
          </div>
          <div>
              <h2 className='my-3 text-xl font-medium'> How many days are you planning your trip</h2>
              <Input placeholder={'Maximum 5 days'} type='number' onChange={(e)=>handleInputChange('numberofdays',e.target.value)}/>
          </div>
          <div >
              <h2 className='my-3 text-xl font-medium'>What is your Budget? </h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((item,index)=>(
                    <div key={index}  onClick={()=>handleInputChange('budget',item.title)}
                    className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
                    ${formData?.budget==item.title&&'shadow-xl border-black'}
                    `}>
                      <h2 className='text-4xl'>{item.icon}</h2>
                      <h2 className='font-bold text-lg'>{item.title}</h2>
                      <h2 className='text-sm text-gray-500'>{item.desc}</h2>

                    </div>
                ))}
              </div>
          </div>

          <div >
              <h2 className='my-3 text-xl font-medium'>With whom are you traveling with on your next adventure? </h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                  {SelectTravelesList.map((item, index) => (
                      <div key={index} onClick={() => handleInputChange('traveler', item.people)}
                          className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
                    ${formData?.traveler == item.people && 'shadow-xl border-black'}
                    `}>
                          <h2 className='text-4xl'>{item.icon}</h2>
                          <h2 className='font-bold text-lg'>{item.title}</h2>
                          <h2 className='text-sm text-gray-500'>{item.desc}</h2>

                      </div>
                  ))}
              </div>
          </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading}
        onClick={OnGenerateTrip}>Generate Trip  
          {loading?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />: ("")
          }
        </Button>
      </div>

      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>
            
            <DialogDescription>
              <img src='/logo.png'/>
              <h2 className='font-bold text-lg mt-7 '> Sign In with Google</h2>
              <p>Sign In to the website with google authentication securely</p>
              <Button onClick={login}
               className="w-full mt-5 flex gap-5 items-center rounded-lg">
                
                  <FcGoogle className='h-7 w-7' /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


   
    </div>
  )
}

export default CreateTrip