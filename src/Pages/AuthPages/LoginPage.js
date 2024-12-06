import React from 'react'
import Header from '../../Components/Header/Header'
import LoginInput from '../../Components/Login-Signup-Input/LoginInput'

const LoginPage = () => {
  return (
    <div>
      <div className='w-full fixed'>
      <Header/>
      </div>
      <LoginInput/>
    </div>
  )
}

export default LoginPage
