/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleContactUs = () => {
    window.location.href = 'mailto:sahilbambarkar007@gmail.com';
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  };

  const handleLogout = () => {
    googleLogout(); 
    localStorage.clear(); 
    window.location.reload(); 
  };

  return (
    <div className='p-3 shadow-md flex justify-between px-5 items-center'>
      <img src='/logo.png' alt="Logo" />

      <div className='flex space-x-4'>
        <Button variant="secondary" className="rounded-full" onClick={handleContactUs}>Contact Us</Button>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href='/create-trip'><Button variant="outline" className="rounded-full"> +  Create Trip</Button></a>
            <a href='/my-trips'><Button variant="outline" className="rounded-full">My Trips</Button></a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  className='h-[35px] w-[35px] rounded-full'
                  alt={user.name}
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer font-medium text-center text-xl ' onClick={handleLogout}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.png' alt="Logo" />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign In to the website with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-5 items-center rounded-lg">
                <FcGoogle className='h-7 w-7' /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
