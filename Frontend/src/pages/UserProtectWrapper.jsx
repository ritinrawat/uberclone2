import React, { useState,useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function UserProtectWrapper({children}) {
  
    const token=localStorage.getItem('usertoken')
    const {user,setUser}=useContext(UserDataContext)
    const [isLoading,setIsLoading]=useState(true)
    const navigate=useNavigate()
    useEffect(() => {
      if (!token) {
        navigate('/login'); // Redirect if no token is present
        return;
      }
    
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
          localStorage.removeItem('usertoken');
          navigate('/login'); // Redirect if the token is invalid
        });
    }, [token]);
 if(isLoading){
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

export default UserProtectWrapper
