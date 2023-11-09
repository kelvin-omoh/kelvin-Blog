import React, { useEffect, useState } from 'react'
import Logo from '../../Assets/mylogo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie';

const SignIn = () => {
    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const [token,setToken]=useCookies(["accessToken",'userName'])
    const navigate=useNavigate()

    const reDirect=()=>{
      navigate('/')
      toast.success('Welcome')
    }

    console.log(token);
  const SignIn=async(e)=>{
    e.preventDefault()

    try{
   const  res = await axios.post('http://localhost:3001/auth/login',{userName,password})

        toast.success('Login successfull')
        setToken("accessToken",res.data)
        console.log(res.data);
       console.log(token.userName);

        reDirect()

    }

    catch(err){
      toast.error('Registration failed ,try again....')
    }


  }


 

  useEffect(()=>{
  token.accessToken && reDirect()
  
  },[])


  return (
    <div className=' h-[100vh] gap-4 grad w-full flex  justify-center items-center'>
      <Toaster
  position="bottom-right"
  reverseOrder={false}
/>

          <div className=' p-5 rounded-lg  bg-white'>
            <h1 className=' text-center font-extrabold '>SIGN-IN</h1>
            <p className=' py-3'> Hello World sign-in to contibute and be part of the us....</p>
           
            <form onSubmit={(e)=>SignIn(e)} >
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
            <p className=' my-4 '>No account? <Link to='/sign-up' className=' text-[#367bc0]'> Create one!</Link></p>
          </div>
    </div>
  )
}

export default SignIn