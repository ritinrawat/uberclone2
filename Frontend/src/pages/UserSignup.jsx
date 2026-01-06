import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
function UserSignup() {
  const [firstname,setFirstname]=useState('')
  const [lastname,setLastname]=useState('')
  const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   
  const navigate=useNavigate()
  const {user,setUser} = React.useContext(UserDataContext)
   const submitHandler = async (e)=>{
  e.preventDefault()
  const newUser=({
    fullname:({
      firstname:firstname,
      lastname:lastname,
    }),
    email:email,
    password:password
  })
 const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
 console.log(response);
 
 if(response.status == 201){
  const data = response.data
  setUser(data.user)
  localStorage.setItem('usertoken',data.token)
  navigate('/Start')
 }
  setFirstname('')
  setLastname('')
  setEmail('')
  setPassword('')
   }
  return (
    <div className='p-7 h-screen flex flex-col justify-between' >
    <div>
      <div className='p-4'>
      <img className='w-20 ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      </div>

         <form onSubmit={(e)=>submitHandler(e)} action="">
         <h3 className='text-lg mb-2 font-medium '>What is your Name</h3>
          <div className='flex gap-4'>
       
         <input className='bg-[#eeeeee] w-1/2 border  rounded px-4 py-2  text-base placeholder:text-base' 
        value={firstname}  onChange={(e)=>setFirstname(e.target.value)}  required type="text"
        placeholder='firstname' />
         <input className='bg-[#eeeeee] w-1/2 border  rounded px-4 py-2  text-base placeholder:text-base'
         value={lastname}  onChange={(e)=>setLastname(e.target.value)}  required type="text"
        placeholder='lastname'/>
          </div>
         <h3 className='text-lg mb-2 font-medium'>What is your email</h3>
         <input className='bg-[#eeeeee] w-full border mb-7 rounded px-4 py-2  text-base placeholder:text-base'
         value={email} onChange={(e)=>setEmail(e.target.value)}  required type="email"
        placeholder='email' />
         <h3 className='text-lg mb-2 font-medium '>Enter Password</h3>
         <input className='bg-[#eeeeee] border mb-3 rounded px-4 py-2 w-full  text-base placeholder:text-base'  
         value={password} onChange={(e)=>setPassword(e.target.value)}  required type="password"  placeholder='password' />
         <button className='bg-black font-samibold mb-7 text-white w-full rounded px-4 py-2  text-lg ' >Create new Account</button>
         <p className='text-center mt-3'>Already have a Account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
         </form>
         </div>
        <div>
         
         </div>
         
         
    <p className='text-[10px] leading-5'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy </span>
    and <span className='underline'>Terms of Service apply</span></p>
      </div>
  )
}

export default UserSignup
