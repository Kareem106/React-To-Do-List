import React, { useContext, useEffect, useState } from 'react'
import { SignInForm } from '../components/SignInForm'
import { UserContext } from '../context/UserProvider'
import { Link, useNavigate } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
export const Register = () => {
  const navigate=useNavigate();
  const {token}=useContext(UserContext);
  const [registered,setRegistered]=useState(true);
  useEffect(()=>{
    if(token){
      navigate('/');
    }
  })
  return (
    <div>
      {
        registered?
        <SignInForm changeReg={()=>setRegistered(!registered)}></SignInForm>:
        <SignUpForm changeReg={()=>setRegistered(!registered)}></SignUpForm>
      }

    </div>
  )
}
