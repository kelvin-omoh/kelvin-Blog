import React, { useEffect, useState } from 'react'
import Logo from '../../Assets/mylogo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
const SignUp = () => {
    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const [token,setToken]=useCookies(["accessToken"])
    const navigate=useNavigate()
    const SignUp=(e)=>{
        e.preventDefault()
        axios.post('https://kelvinblog-api.onrender.com/auth/register',{username:userName,password}).then(()=>{
            alert('Registration completed')
            setPassword('')
            setUserName('')
            navigate("/Sign-in")

        }).catch(err=>{
            alert('Registration failed ,try again..')
        })


        console.log({username:userName,password});
    }


  const reDirect=()=>{
    navigate('/')
    toast.success('Welcome')
  }

  useEffect(()=>{
  token.accessToken && reDirect()
  
  },[])



  return (
    <div className=' h-[90vh] gap-4 grad w-full flex  justify-center items-center'>
          <div className=' p-5 rounded-lg  bg-white'>
            <h1 className=' text-center font-extrabold '>SIGN-UP</h1>
            <p className=' py-3'> Hello World sign-up to contibute and be part of the us....</p>
           
            <form onSubmit={(e)=>SignUp(e)} >
                <div className=' flex flex-col my-4 gap-3 '>
               <label className=' font-[900] text-[1.3em]' >
                    Username
                </label>
                <input required value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder=' johnDoe' className='w-full border-[.4px] rounded-md p-3  text-lg' />
                </div>
                <div className=' flex flex-col my-4 gap-3 '>
               <label className=' font-[900] text-[1.3em]' >
                    Password
                </label>
                <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' className=' w-full border-[.4px] rounded-md p-3  text-lg' />
                </div>

                <div>
                    <button className=' w-full p-4 rounded-md bg-black text-white mt-5'> Submit</button>
                </div>
               
            </form>
            <p className=' my-4 '><Link to='/sign-in' className=' text-[#367bc0]'> Sign-in to your account!</Link></p>
          </div>
    </div>
  )
}

export default SignUp

