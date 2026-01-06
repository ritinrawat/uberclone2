import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

function CaptainProtectWrapper({children}) {
  
  const token=localStorage.getItem('captaintoken')
  const {captain,setCaptain}=useContext(CaptainDataContext)

  const [isLoading,setIsLoading]=useState(true)
  const navigate=useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/captain-login'); // Redirect if no token is present
      return;
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data);
       
          
          setIsLoading(false);
        
        
        
        }
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        localStorage.removeItem('captaintoken');
        navigate('/captain-login'); // Redirect if the token is invalid
      });
  }, [token]);
if(isLoading){
  console.log('Loading State:', isLoading);
return  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
<div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
<p className="text-center p-3">Loading your location...</p>
</div>
}
return (
<>
{children}</>
)
}

export default CaptainProtectWrapper;
