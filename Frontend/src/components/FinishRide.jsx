import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function FinishRide(props) {
  const navigate=useNavigate()
 const endRide= async ()=>{
 
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
    rideId:props.ride._id,
   
 },{
   headers:{
     Authorization:`Bearer ${localStorage.getItem("captaintoken")}`
    }   
 })
 
   if(response.status==200){
     navigate('/captain-home')
   }
  }
  return (
    <div>
     <div>
    <h5 className='p-1 text-center w-[93] absolute top-0' 
     onClick={()=>props.setFinishRidePanel(false)}
    >
      <i className='text-3xl text-gray-400 ri-arrow-down-wide-line'></i>
    </h5>
    <h3 className='text-2xl font-semibold p-3'>Finish this Ride</h3>
    <div className=' bg-yellow-400 rounded-md flex justify-between items-center  p-6' >
    <div className='flex justify-start items-center gap-3'>
    <img className='w-10 h-10  object-cover rounded-lg ' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />     
     <h4 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h4>
    </div>
    <div>
    <h4 className='text-xl font-semibold'>{props.ride?.distance}</h4>
  
    </div>
   </div>
    <div className='flex justify-between flex-col items-center  '>

      <div className='w-full'>
      
        <div className='flex items-center p-1 border-b-2  gap-5'>
          <i className='ri-map-pin-fill'></i>
          <div><h3 className='text-lg font-medium'>Pickup</h3>
          <p className='text-base text-gray-600'>{props.ride?.pickup}</p></div>
          </div>      
        <div className='flex items-center p-1 border-b-2  gap-5'>
        <i className="ri-square-fill"></i>
          <div>
          <h3 className='text-lg font-medium'>Destination</h3>
          <p className='text-base text-gray-600'>{props.ride?.destination}</p></div>
          </div>
        <div className='flex items-center p-1 border-b-2 gap-5'>
        <i className="ri-bank-card-fill"></i>
          <div>
          <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
          <p className='text-base text-gray-600'>Cash Cash</p></div>
          </div>
         
      </div>
      <button onClick={endRide}  className='w-full text-2xl text-center text-white py-2 cursor-pointer bg-green-600 rounded-lg mt-2'>Finish Ride</button>
    
    </div>
      </div>  
    </div>
  )
}

export default FinishRide
