import React, { useState,useRef, useEffect } from 'react'
import {useGSAP} from '@gsap/react'
import  gsap  from 'gsap'
import 'remixicon/fonts/remixicon.CSS'
import LocationPanel from '../components/LocationPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WhatingForDriver from '../components/WhatingForDriver'
import axios from 'axios'
import {SocketContext} from '../context/SocketContext'
import {useContext} from 'react';
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTraking'
function Start() {
const [pickup,setPickup]=useState("")
const [destination,setDestination]=useState("")
const [panelopen,setPanelOpen]=useState(false)
const [confirmRide,setConfirmRide]=useState(false)
const vehiclePanelRef=useRef(null)
const panelRef = useRef(null)
const confirmRidePanelRef=useRef(null)
const panelCloseRef = useRef(null)
const lookingForDriverRef= useRef(null)
const waitingForDriverRef=useRef(null)
const [vehiclePanel,setVehiclePanel]=useState(false)
const [vehicleFound,setVehicleFound]=useState(false)
const [waitingDriver,setWaitingDriver]=useState(false)
const [pickupSuggestions,setPickupSuggestions]=useState([])
const [destinationSuggestions,setDestinationSuggestion]=useState([])
const [activeField,setActiveField]=useState(null)
const [fare,setFare]= useState({})
const [vehicleType,setVehicleType]=useState(null)
const [vehicleImage,setVehicleImage]=useState(null)
const [ride,setRide]=useState(null)
const [coordination,setCoordination]=useState(null)
const [flag,setFlage]=useState(false)

const {socket}=useContext(SocketContext)
const {user}=useContext(UserDataContext)
const navigate=useNavigate()

useEffect(()=>{
 console.log(user)
socket.emit("join",{userType:'user',userId:user._id})
},[user])

socket.on('ride-confirmed',(ride)=>{
  setRide(ride)
  setVehicleFound(false)
  setWaitingDriver(true)
})

socket.on('ride-started',ride=>{
 
  setWaitingDriver(false)
  navigate('/riding',{state:{ride}})

})


const handlePickupChange=async (e) =>{
  setPickup(e.target.value)
  try{
    const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {params:{input:e.target.value},
      headers:{
        Authorization: `Bearer ${localStorage.getItem('usertoken')}`
      }
    
    })
    setPickupSuggestions(response.data)
    setActiveField('pickup')
  }catch(error){
    console.error("Error fetching destination suggestions:", error);
  }
}
const handleDestinationChange=async (e) =>{
  setDestination(e.target.value)
  try{
    const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {params:{input:e.target.value},
      headers:{
        Authorization:`Bearer ${localStorage.getItem('usertoken')}`
      }
    
    })
    setDestinationSuggestion(response.data)
    setActiveField('destination')
  }catch(error){
    console.error("Error fetching destination suggestions:", error);
  }
}

  const submitHandle=(e)=>{
e.preventDefault()
  }

  useGSAP(function(){
    if(panelopen){
      gsap.to(panelRef.current,{
        height:'70%'
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:0
      })
      gsap.to(panelCloseRef.current,{
       opacity:0
      })
    }
 
  },[panelopen])

  useGSAP(function(){
   if(vehiclePanel){
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
      })
   }else{
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
      })
 }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRide){
     gsap.to(confirmRidePanelRef.current,{
       transform:'translateY(0)'
       })
    }else{
     gsap.to(confirmRidePanelRef.current,{
       transform:'translateY(100%)'
       })
  }
   },[confirmRide])
 
   useGSAP(function(){
    if(vehicleFound){
     gsap.to(lookingForDriverRef.current,{
       transform:'translateY(0)'
       })
    }else{
     gsap.to(lookingForDriverRef.current,{
       transform:'translateY(100%)'
       })
  }
   },[vehicleFound])

   useGSAP(function(){
    if(waitingDriver){
     gsap.to(waitingForDriverRef.current,{
       transform:'translateY(0)'
       })
    }else{
     gsap.to(waitingForDriverRef.current,{
       transform:'translateY(100%)'
       })
  }
   },[waitingDriver])

   async function findtrip() {
    setPanelOpen(false);
    setVehiclePanel(true);
  
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup,destination},
        headers: {
          Authorization:`Bearer ${localStorage.getItem('usertoken')}`,
        },
      });

   
      console.log("getfare",response.data.distance);
      
    setFare(response.data.fare)
    } catch (error) {
      console.error("Error fetching fare:", error.message);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  }
  async function createRide(){
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
        pickup,
        destination,
        vehicleType
       },{
         headers: {
           Authorization:`Bearer ${localStorage.getItem('usertoken')}`,
         }
     })
     console.log("duration",response.data);
     setCoordination(response.data)
    setFlage(true)
    } catch (error) {
      console.error("Error creating ride:", error.message);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
   

  
}
  
 
  return (
    <div className='h-screen relative overflow-hidden'>
    <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
    <div className='w-screen h-screen '>
<LiveTracking ride={ride}  />
    </div>
    <div className='flex flex-col justify-end h-screen  absolute top-0 w-full'>
      <div className='h-[30%] p-5 bg-white'>

     <h5 ref={panelCloseRef} onClick={()=>setPanelOpen(false)} className='absolute right-6 top-6 text-4xl'><i className='ri-arrow-down-wide-line'></i></h5>
      <h4 className='text-2xl font-semibold'>Find a trip</h4>
      <form onSubmit={(e)=>{
        submitHandle(e)
      }}>
        <input onClick={()=>setPanelOpen(true)} value={pickup} onChange={handlePickupChange} className='bg-[#eee] px-12 py-2 text-lg w-full rounded-lg mt-5 ' type="text" placeholder='Add a pick-up Location' />
        <input onClick={()=>setPanelOpen(true)} value={destination} onChange={handleDestinationChange} className='bg-[#eee] px-12 py-2 text-lg w-full rounded-lg mt-3 ' type="text" placeholder='Enter your destination' />
      </form>

    </div>
    <button onClick={findtrip} className='px-4 py-2 w-full rounded-md text-white bg-black mt-3'>Find Trip</button>
    <div ref={panelRef} className='bg-white h-0 '>
      <LocationPanel 
      suggestions={activeField === 'pickup' ? pickupSuggestions:destinationSuggestions}
   setPickup={setPickup}  setDestination={setDestination} setPanelOpen={setPanelOpen} activeField={activeField}  setVehiclePanel={setVehiclePanel}/>
    </div>
    </div>
    <div ref={vehiclePanelRef}  className='fixed w-full translate-y-full z-10 bg-white bottom-0 px-3 py-10' >
    <VehiclePanel fare={fare}  setVehicleImage={setVehicleImage} setVehicleType={setVehicleType} setConfirmRide={setConfirmRide} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full translate-y-full z-10 bg-white bottom-0 px-3 py-10' >
   <ConfirmRide fare={fare} vehicleImage={vehicleImage} createRide={createRide} vehicleType={vehicleType} pickup={pickup} destination={destination}  setVehicleFound={setVehicleFound} setVehiclePanel={setVehiclePanel} setConfirmRide={setConfirmRide} />
      </div>
      <div ref={lookingForDriverRef}  className='fixed w-full translate-y-full z-10 bg-white bottom-0 px-3 py-10' >
  <LookingForDriver fare={fare} vehicleImage={vehicleImage} createRide={createRide} vehicleType={vehicleType} pickup={pickup} destination={destination}  setWaitingDriver={setWaitingDriver} setVehicleFound={setVehicleFound}  />
      </div>
      <div  ref={waitingForDriverRef}  className='fixed w-full translate-y-full z-10 bg-white bottom-0 px-3 py-10' >
    <WhatingForDriver ride={ride} setVehicleFound={setVehicleFound}  setWaitingDriver={setWaitingDriver}/>
      </div>
    </div>
   
  )
}

export default Start
