import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

function CaptainSignup() {
  const [firstname,setFirstname]=useState('')
  const [lastname,setLastname]=useState('')
  const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')


   const[vehicleColor,setVehicleColor]=useState('')
   const[vehiclePlate,setVehiclePlate]=useState('')
   const[vehicleCapacity,setVehicleCapacity]=useState('')
   const[vehicleType,setVehicleType]=useState('')

   const navigate=useNavigate()
   const {captain,setCaptain}=useContext(CaptainDataContext)
   const submitHandler = async (e)=>{
  e.preventDefault()
  const CaptainData={
    fullname:({
      firstname:firstname,
      lastname:lastname,
    }),
    email:email,
    password:password,
    vehicle:{
      color:vehicleColor,
      plate:vehiclePlate,
      capacity:vehicleCapacity,
      vehicleType:vehicleType
    }
  }
const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,CaptainData)
console.log(response);

if(response.status==201){
  const data=response.data
  setCaptain(data.captain)
  localStorage.setItem('captaintoken',data.token)
  navigate("/captain-home")
}
  setFirstname('')
  setLastname('')
  setEmail('')
  setPassword('')
  setVehicleColor('')
  setVehiclePlate('')
  setVehicleCapacity('')
  setVehicleType('')
   }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
         <h1 className='text-5xl text-black font-bold py-5'>Uber</h1>
         <form onSubmit={(e)=>submitHandler(e)} action="">
         <h3 className='text-lg mb-2 font-medium '>What is our Captain's Name</h3>
          <div className='flex gap-4 mb-3'>
       
         <input className='bg-[#eeeeee] w-1/2 border   rounded px-4 py-2  text-base placeholder:text-base' 
        value={firstname}  onChange={(e)=>setFirstname(e.target.value)}  required type="text"
        placeholder='firstname' />
         <input className='bg-[#eeeeee] w-1/2 border  rounded px-4 py-2  text-base placeholder:text-base'
         value={lastname}  onChange={(e)=>setLastname(e.target.value)}  required type="text"
        placeholder='lastname'/>
          </div>
         <h3 className='text-lg mb-2 font-medium'>What is our Captain's email</h3>
         <input className='bg-[#eeeeee] w-full border mb-7 rounded px-4 py-2  text-base placeholder:text-base'
         value={email} onChange={(e)=>setEmail(e.target.value)}  required type="email"
        placeholder='email' />
         <h3 className='text-lg mb-2 font-medium '>Enter Password</h3>
         <input className='bg-[#eeeeee] border mb-3 rounded px-4 py-2 w-full  text-base placeholder:text-base'  
         value={password} onChange={(e)=>setPassword(e.target.value)}  required type="password"  placeholder='password' />
                <h3 className='text-lg mb-2 font-medium '>Vehicle Information</h3>
                <div className='flex gap-4 mb-3'>
          <input
    className="bg-[#eeeeee] border mb-3 rounded px-4 py-2 w-1/2 text-base placeholder:text-base"
    value={vehicleColor}
    onChange={(e) => setVehicleColor(e.target.value)}
    required
    type="text"
    placeholder="Vehicle Color"
  />

  <input
    className="bg-[#eeeeee] border mb-3 rounded px-4 py-2 w-1/2 text-base placeholder:text-base"
    value={vehiclePlate}
    onChange={(e) => setVehiclePlate(e.target.value)}
    required
    type="text"
    placeholder="Vehicle Plate"
  />
</div>
<div className='flex gap-4 mb-3'>
  <input
    className="bg-[#eeeeee] border mb-3 rounded px-4 py-2 w-1/2 text-base placeholder:text-base"
    value={vehicleCapacity}
    onChange={(e) => setVehicleCapacity(e.target.value)}
    required
    type="number"
    placeholder="Vehicle Capacity"
  />

<select
  className="bg-[#eeeeee] border mb-3 rounded px-4 py-2 w-full text-base placeholder:text-base"
  value={vehicleType}
  onChange={(e) => setVehicleType(e.target.value)}
  required
>
  <option value="" disabled>
    Select Vehicle Type
  </option>
  <option  value="car">car</option>
  <option value="bike">bike</option>
  <option value="truck">truck</option>
  <option value="auto">auto</option>
</select>
  </div>
         <button className='bg-black font-samibold mb-7 text-white w-full rounded px-4 py-2  text-lg ' >Create new Account</button>
         <p className='text-center mt-3'>Already have a Account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
         </form>
         </div>
        <div>
         
         </div>
         
         
    <p className='text-[10px] leading-5'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy </span>
    and <span className='underline'>Terms of Service apply</span></p>
      </div>
  )
}

export default CaptainSignup
