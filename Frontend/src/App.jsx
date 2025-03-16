import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { UserDataContext } from './context/UserContext'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRidePopUp from './pages/CaptainRidePopUp'


function App() {
  const ans=useContext(UserDataContext)
  
  
  return (
    <div>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<UserLogin/>}/>
  <Route path='/signup' element={<UserSignup/>}/>
  <Route path='/riding' element={<Riding/>}/>
  <Route path='/captain-login' element={<CaptainLogin/>}/>
  <Route path='/captain-signup' element={<CaptainSignup/>}/>
  <Route path='/captain-ride' element={<CaptainRidePopUp/>}/>
  <Route path='/start' element={
    <UserProtectWrapper>
      <Start/>
    </UserProtectWrapper>
  }/>
   <Route path='/users/logout' element={
    <UserProtectWrapper>
     <UserLogout/>
    </UserProtectWrapper>
  }/>
  <Route path='/captain-home'element={
    <CaptainProtectWrapper>
      <CaptainHome/>
    </CaptainProtectWrapper>
  }/>
     <Route path='/captains/captain-logout' element={
    <CaptainProtectWrapper>
   <CaptainLogout/>
    </CaptainProtectWrapper>
  }/>
</Routes>
    </div>
  )
}

export default App
