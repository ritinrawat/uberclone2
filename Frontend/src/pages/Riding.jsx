import React from 'react'
import { Link ,useLocation} from 'react-router-dom'
import { useEffect,useContext } from 'react'
import {SocketContext} from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTraking'

function Riding() {
  const location=useLocation()
 
  const {ride}=location.state || {}
  const {socket} =useContext(SocketContext)
  const navigate=useNavigate()
  socket.on("ride-ended",(ride)=>{
    console.log(ride)
    navigate('/start')
   
  })

  return (
    <div className='h-screen'>
        <Link to='/start' className='fixed h-10 top-2 right-2 bg-white  p-2 flex items-center justify-center rounded-full'>
            <i className='text-2xl font-medium ri-home-5-line'></i>
        </Link>
        <div className='h-1/1'>
         <LiveTracking ride={ride} />
        </div>
        <div className='h-1/2'>
        <div className='w-full'>
        <div className='flex  items-center mt-3 justify-around'>
    <img className='w-[12%]  rounded-lg' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />
     <div className='text-right'>
        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}</h2>
        <h4 className='text-xl font-semibold -mt-1 -mb-1 p-1'>{ride?.captain.vehicle.plate}</h4>
        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
     </div>
   </div>
      <div className='flex items-center p-4 border-b-2  gap-5'>
      <i className="ri-square-fill"></i>
        <div>
        <h3 className='text-lg font-medium'>Destination</h3>
        <p className='text-base text-gray-600'>{ride?.destination}</p></div>
        </div>
      <div className='flex items-center p-5 border-b-2 gap-5'>
      <i className="ri-bank-card-fill"></i>
        <div>
        <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
        <p className='text-base text-gray-600'>Cash</p></div>
        </div>
        <div className='flex justify-center items-center'>
        <button className=' w-[90%] text-2xl text-white py-2 cursor-pointer bg-green-600 rounded-lg mt-3'>Make a Payment</button>
        </div>
        
         </div>
       
    </div>
       
    </div>
  )
}

export default Riding