import React, { useState } from 'react'
import { Link, useNavigate,  } from 'react-router-dom'

import axios from 'axios'

import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

function CaptainLogin() {
  const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const {captain,setCaptain}=useContext(CaptainDataContext)
  const navigate=useNavigate()
   const submitHandler = async (e)=>{
  e.preventDefault()
  const CaptainData={
    email:email,
    password:password
  }
  const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,CaptainData)

  if(response.status==200){
    const data=response.data
    setCaptain(data.captain)
    localStorage.setItem("captaintoken",data.token)
    navigate('/captain-home')
  
  }
  setEmail('')
  setPassword('')
}
  return (
    <div className='p-7 h-screen flex flex-col justify-between' >
  <div>

       <h1 className='text-5xl text-black py-5 font-bold '>Uber</h1>
      
   
       <form onSubmit={(e)=>submitHandler(e)} action="">
       <h3 className='text-xl mb-2 font-lg '>What is your email</h3>
       <input className='bg-[#eeeeee] w-full border mb-7 rounded px-4 py-2  text-lg placeholder:text-xl' required type="email" value={email}
       onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
       <h3 className='text-xl mb-2 font-lg '>Enter Password</h3>
       <input onChange={(e)=>setPassword(e.target.value)} className='bg-[#eeeeee] border mb-3 rounded px-4 py-2 w-full  text-lg placeholder:text-xl'  
       required type="password" value={password} placeholder='password' />
       <button className='bg-black font-samibold mb-7 text-white w-full rounded px-4 py-2  text-lg ' >Login</button>
       <p className='text-center mt-3'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a captian</Link></p>
       </form>
       </div>
      <div>
       <Link to='/login' className='bg-yellow-400 flex items-center justify-center font-samibold mb-7 text-black w-full rounded px-4 py-2  text-lg'>Sign in as User</Link>
       </div>
    
    </div>
  )
}

export default CaptainLogin
