import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div>
     <div className=' bg-[url("https://img.lovepik.com/bg/20231213/traffic-light-on-a-street-by-night_2452984_wh1200.png")]  bg-center bg-cover  h-screen  pt-8  w-full bg-red-400 flex justify-between flex-col'>
     <div className='bg-red'><img className='w-[30%] absolute left-3 top-3 ' src="https://helios-i.mashable.com/imagery/articles/03y6VwlrZqnsuvnwR8CtGAL/hero-image.fill.size_1248x702.v1623372852.jpg" alt="" /></div>
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center text-white bg-black py-3 rounded mt-5'>Continue</Link>
            </div>
     </div>
    </div>
  )
}

export default Home
