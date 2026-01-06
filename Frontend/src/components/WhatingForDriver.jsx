import React from 'react'

function WhatingForDriver(props) {
  return (
    <div >
    <h5 className='p-1 text-center w-[93] absolute top-0' onClick={()=>props.setWaitingDriver(false)
    }>
      <i className='text-3xl text-gray-400 ri-arrow-down-wide-line'></i>
    </h5>
   <div className='flex items-center justify-around'>
    <img className='w-[25%] rounded-lg ' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />
     <div className='text-right '>
        <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname} {props.ride?.captain.fullname.lastname}</h2>
        <h4 className='text-xl font-semibold p-2 -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
        {/* <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p> */}
        <h4 className='text-xl font-semibold'>{props.ride?.otp}</h4>
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
     
    </div>
    
      </div>
  )
}

export default WhatingForDriver
