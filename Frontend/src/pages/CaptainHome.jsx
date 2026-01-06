import React, {useEffect, useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUpRef from '../components/ConfirmRidePopUpRef'
import {CaptainDataContext} from '../context/CaptainContext'
import {SocketContext} from '../context/SocketContext'

import axios from 'axios'
import LiveTracking from '../components/LiveTraking'

function CaptainHome() {
  const [ridePop,setRidePop]=useState(false)
 const ridePopUpRef= useRef(null)
 const [confirmRidePop,setConfirmRidePop]=useState(false)
 const confirmRidePopUpRef=useRef(null)
 const [ride,SetRide]=useState(null)
 const [ltd,setLtd]=useState(null)
 const[lng,setLng]=useState(null)
const {socket}=useContext(SocketContext)
const {captain}=useContext(CaptainDataContext)

useEffect(() => {
  console.log(captain.captain)
socket.emit('join',{userId:captain.captain._id,userType:'captain'})

const updateLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
      
      //  console.log({ userId: captain.captain._id,
      //     location: {
      //       ltd: position.coords.latitude,
      //       lng: position.coords.longitude,
      //     },})
        socket.emit('update-location-captain', {
    
          userId: captain.captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
    const locationInterval = setInterval(updateLocation, 10000);

};
updateLocation();

// return () => clearInterval(locationInterval);

})

socket.on('new-ride',(data)=>{
  console.log(data)
  SetRide(data)
  setRidePop(true)
}) 

const confirmRide= async()=>{

  try{
    const token=localStorage.getItem('captaintoken')
  
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId:ride._id,
      captainId:captain._id
   },{
     headers:{
       Authorization:`Bearer ${token}`
      }   
   })

   console.log("✅ Ride Confirmed:", response.data);
   
    setLtd(response.data.captain.location.ltd)
    setLng(response.data.captain.location.lng)
     setRidePop(false)
     setConfirmRidePop(true)
   }catch(err){
    console.log(err)
      }
  }

 // Return cleanup function

  useGSAP(function(){
    if(ridePop){
     gsap.to(ridePopUpRef.current,{
       transform:'translateY(0)'
       })
    }else{
     gsap.to(ridePopUpRef.current,{
       transform:'translateY(100%)'
       })
  }
   },[ridePop])

   useGSAP(function(){
    if(confirmRidePop){
     gsap.to(confirmRidePopUpRef.current,{
       transform:'translateY(0)'
       })
    }else{
     gsap.to(confirmRidePopUpRef.current,{
       transform:'translateY(100%)'
       })
  }
   },[confirmRidePop])
  return (
    <div className='h-screen'>
      <div>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        <Link to='/start' className='fixed h-10 top-2 right-2 bg-white  p-2 flex items-center justify-center rounded-full'>
        <i className='text-2xl font-medium ri-logout-box-r-line'></i>
    </Link>
      </div>
 
    <div className='h-1/2'>
     <LiveTracking />
    </div>
    <div className='h-2/5 p-6'>
  <CaptainDetails />
</div>
<div ref={ridePopUpRef}  className='fixed w-full  z-10 bg-white bottom-0 px-3 py-10' >
    <RidePopUp ride={ride} setRidePop={setRidePop} setConfirmRidePop={setConfirmRidePop} confirmRide={confirmRide} />
      </div>
      <div ref={confirmRidePopUpRef}  className=' h-screen fixed w-full  z-10 bg-white bottom-0 px-3 py-10'>
    <ConfirmRidePopUpRef ride={ride} setConfirmRidePop={setConfirmRidePop} setRidePop={setRidePop}/>
      </div>
    
</div>
  )
}

export default CaptainHome

