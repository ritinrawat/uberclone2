import React from 'react'

function LookingForDriver(props) {
  return (
    <div className='p-0 m-0' >
  <h5 className='p-1 text-center w-[93] absolute top-0' onClick={()=>{
  props.setVehicleFound(false)
  }}>

    <i className='text-3xl text-gray-400 ri-arrow-down-wide-line'></i>
   

  </h5>
  <h3 className='text-2xl font-semibold '>Looking for Driver</h3>
  <div className='flex justify-between flex-col items-center  '>
    <img className='w-[40%]' src={props.vehicleImage}alt="" />
    <div className='w-full'>
      <div className='flex items-center p-1 border-b-2  gap-5'>
        <i className='ri-map-pin-fill'></i>
        <div><h3 className='text-lg font-medium'>Pickup</h3>
        <p className='text-base text-gray-600'>{props.pickup}</p></div>
        </div> 
      <div className='flex items-center p-1 border-b-2  gap-5'>
      <i className="ri-square-fill"></i>
        <div>
        <h3 className='text-lg font-medium'>Destination</h3>
        <p className='text-base text-gray-600'>{props.destination}</p></div>
        </div>
      <div className='flex items-center p-1 border-b-2 gap-5'>
      <i className="ri-bank-card-fill"></i>
        <div>
        <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
        <p className='text-base text-gray-600'>Cash</p></div>
        </div>
       
    </div>
    {/* <button onClick={()=>props.setWaitingDriver(true)}  className='w-full text-2xl text-white py-2 cursor-pointer bg-green-600 rounded-lg mt-2'>Confirm</button> */}
  </div>
  
    </div>
  )
}

export default LookingForDriver
