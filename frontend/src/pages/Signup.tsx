import React from 'react'

import SignupQuote from "../components/SignupQuote"
import AuthComponent from '../components/AuthComponent'
export const Signup = () => {
  return (
    <div className='grid grid-cols-2'>
      <div>
      <AuthComponent type="signup"/>
      </div>
      <div>
      <SignupQuote/>
      </div>
    </div>
  )
}
