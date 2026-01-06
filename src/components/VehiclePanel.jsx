import React from 'react'

function VehiclePanel(props) {


  return (
    <>
      <div>
      <h5  onClick={()=>props.setVehiclePanel(false)} className='text-center w-[93%] absolute top-0  text-3xl'><i className='ri-arrow-down-wide-line'></i></h5>
      <h3 className='text-2xl font-semibold mb-3 '>Choose a vehicle </h3>
      <div onClick={()=> {props.setConfirmRide(true) 
      props.setVehicleType('car')
      props.setVehicleImage(' https://cdni.autocarindia.com/utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Maruti-Suzuki-Baleno-040320222001.jpg&w=872&h=578&q=75&c=1')
        }}  className='flex w-full rounded-xl active:border-black  mb-2 border-2 p-2 items-center justify-between'>
        <img className='h-12' src="https://cdni.autocarindia.com/utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Maruti-Suzuki-Baleno-040320222001.jpg&w=872&h=578&q=75&c=1" alt="" />
        <div className='w-1/2 ml-6'>
          <h4 className='font-medium text-xl'>UberGo <span ><i className="ri-map-pin-user-line ">4</i></span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable,compact rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹{props.fare.car}</h2>
      </div>
      <div onClick={()=> {props.setConfirmRide(true) 
      props.setVehicleType('motorcycle')
      props.setVehicleImage('https://chybmedia.s3.ap-south-1.amazonaws.com/models/bikes/hf-100-1-1065_thumb.jpg')
        }}  className='flex w-full rounded-xl active:border-black   mb-2 border-2 p-2 items-center justify-between'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt="" />
        <div className='w-1/2 ml-4'>
          <h4 className='font-medium text-xl'>UberGo <span ><i className="ri-map-pin-user-line">1</i></span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable MotorCycle rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹{props.fare.motorcycle}</h2>
      </div>
      <div onClick={()=> {props.setConfirmRide(true) 
      props.setVehicleType('auto')
      props.setVehicleImage("https://i.pinimg.com/564x/32/84/74/328474138abea310481783b232f46e74.jpg")
     }}  className='flex w-full rounded-xl active:border-black   border-2 p-2 items-center justify-between'>
        <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s" alt="" />
        <div className='w-1/2 ml-4'>
          <h4 className='font-medium text-xl'>UberGo <span ><i className="ri-map-pin-user-line">3</i></span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹{props.fare.auto}</h2>
    </div>
    </div>
    </>
  
  )
}

export default VehiclePanel
