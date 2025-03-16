import React, { useRef, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap' 
import LiveTracking from '../components/LiveTraking'
function CaptainRidePopUp() {
  const [finshRidePanel,setFinishRidePanel]=useState(false)
  const finshRidePanelRef=useRef(null)
  const location=useLocation()
  const rideData=location.state?.ride

  useGSAP(function(){
    if(finshRidePanel){ 
     gsap.to(finshRidePanelRef.current,{
       transform:'translateY(0)'
       })
    }else{
     gsap.to(finshRidePanelRef.current,{
       transform:'translateY(100%)'
       })
  }
   },[finshRidePanel])
  return (
      <div className='h-screen relative'>
        <div className='fixed p-6 top-0  items-center justify-center'>   
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        <Link to='captain-home' className='fixed h-10 top-2 right-2 bg-white  p-2 flex items-center justify-center rounded-full'>
        <i className='text-2xl font-medium ri-logout-box-r-line'></i>
    </Link>
      </div>
 
    <div className='h-4/5'>
<LiveTracking ride={rideData}/>
    </div>
    <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'>
    <h5 className='p-1 text-center w-[95%] absolute top-0  ' onClick={()=>setFinishRidePanel(true)}>
        <i className='text-3xl  ri-arrow-up-wide-line'></i>
    </h5>
    <h4 className='text-xl font-semibold '>4 KM away</h4>
    <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg' >Complete Ride</button>
    </div>
      <div ref={finshRidePanelRef}  className='h-screen fixed w-full  z-10 bg-white bottom-0 px-3 py-10' >
        <FinishRide ride={rideData}  setFinishRidePanel={setFinishRidePanel} />
          </div>
    </div>
    
  )
}

export default CaptainRidePopUp
