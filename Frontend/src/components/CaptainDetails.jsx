
import React ,{useContext} from 'react'
import { CaptainDataContext} from '../context/CaptainContext'
function CaptainDetails() {
  const {captain}=useContext(CaptainDataContext)


  return (
    <>
       <div className='flex justify-between bg-yellow-400 rounded-lg items-center  p-6' >
    <div className='flex justify-start items-center gap-3'>
    <img className='w-12 h-16  object-cover rounded-lg ' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />
          <h4 className='text-lg font-medium capitalize'>{captain.captain.fullname.firstname} {captain.captain.fullname.lastname}</h4>
    </div>
    <div>
    <h4 className='text-xl font-semibold'>₹295.20</h4>
    <p className='text-sm'>Earned</p> 
    </div>
   </div>
   
  <div className='flex justify-center rounded-xl  bg-gray-100 p-3 gap-5 mt-6 items-start'>
    <div className='text-center'>
    <i className="text-4xl ri-timer-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div>
    <div className='text-center'>
      <i className='text-4xl ri-speed-up-line'></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div>
    <div className='text-center'>
      <i className='text-4xl ri-booklet-line'></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div>
    </div>    
    </>
    
    
  )
}

export default CaptainDetails
