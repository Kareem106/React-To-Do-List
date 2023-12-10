import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider';
import { Link } from 'react-router-dom';
import ErrMsg from './ErrMsg';
export default function SignUpForm ({changeReg}){
  const{SignUpHandler}=useContext(UserContext);
  const initialFormData={
    email:"",
    password:"",
    confirm_password:""
  };
  const [formData,setFormData]=useState(initialFormData);
  const initialErr={email:false,password:false,confirm_password:false};
  const [err,setErr]=useState(initialErr);
  const signUpDataHandler=()=>{
    const {email,password,confirm_password}=formData;
    const emailPattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailPattern.test(email)){
      setErr({...initialErr,email:true});
    }else if(password.length<4){
      setErr({...initialErr,password:true});
    }else if(password!==confirm_password){
      setErr({...initialErr,confirm_password:true});
    }else{
      SignUpHandler(formData);
      setErr(initialErr);
    }
  }
  return (
<form 
onSubmit={(e)=>{
  e.preventDefault(signUpDataHandler());
}}
className="max-w-sm mx-auto">
  <div className="mb-5">
    <label 
    for="email" 
    className="input-label">Your email</label>
    <input 
    onChange={(e)=>{
      setFormData({
        ...formData,
        email:e.target.value
      })
    }}
    type="text" 
    id="email" 
    className="input-field" 
    placeholder="name@gmail.com"/>
    {err.email?
      <ErrMsg msg={"Email format is not corrent!"}></ErrMsg>:
      <></>
    }
  </div>
  <div className="mb-5">
    <label 
    for="password" 
    className="input-label"
    >Your password</label>
    <input 
        onChange={(e)=>{
          setFormData({
            ...formData,
            password:e.target.value
          })
        }}
    type="password" 
    id="password" 
    className="input-field"/>
    {err.password?
      <ErrMsg msg={"Password should be 4 or more chars!"}></ErrMsg>:
      <></>
    }
  </div>
  <div className="mb-5">
    <label 
    for="confirm-password" 
    className="input-label"
    >Confirm password</label>
    <input 
        onChange={(e)=>{
          setFormData({
            ...formData,
            confirm_password:e.target.value
          })
        }}
    type="password" 
    id="confirm-password" 
    className="input-field"/>
    {err.confirm_password?
      <ErrMsg msg={"Two Passwords do not match!"}></ErrMsg>:
      <></>
    }
  </div>
  <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Danger</span>
  <div>
    <span class="font-medium">Ensure that these requirements are met:</span>
      <ul class="mt-1.5 list-disc list-inside">
        <li>Write the Email Correctly.</li>
        <li>Password Should At least 8 chars.</li>
        <li>Confirm your password.</li>
    </ul>
  </div>
</div>
  <p
  className='text-white my-5'>registered ? <button
  onClick={changeReg} 
  className='rounded-md p-1 text-blue-500'>Sign In</button></p>
  <button 
  type="submit" 
  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>)
}
