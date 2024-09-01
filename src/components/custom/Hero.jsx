/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 mt-10'>
          <h1 className='font-extrabold text-[60px] text-center'><span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> personalized itineraries at your FingerTips</h1>
          <p className='text-xl text-center text-gray-500'>Your personal trip planner and travel curator will create personalized itineraries according to your interests and budget.</p>
           
           <Link to={'/create-trip'}>
          <Button>Get Started it,s Free</Button>
          </Link>

          <img src='/Laptop.png' alt='login'
            height={600} width={600}
          />
    </div>
  )
}

export default Hero