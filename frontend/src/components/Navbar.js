import React, { useContext } from 'react'
import Logo from '../Assets/mylogo.png'
import { FaSearch, FaUserAlt, FaUserPlus } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { CategoryContext } from '../context/Category'
const Navbar = () => {

  const [token,setToken]=useCookies(["accessToken"])
  const navigate=useNavigate()
  const {categoryTitle,setCategoryTitle} =useContext(CategoryContext) 
  

  


  return (

       <nav className=' flex   px-[3em] md:px-[5em] justify-between items-center gap-3'>

         <ul className=' flex gap-3 items-center justify-center h-full  '>
          <li className=' pr-4'>
            <Link to="/">
               <img src={Logo} className=' h-[5em] w-[5em]' alt="logo" />
            </Link>
            </li>
           
            <li onClick={()=>setCategoryTitle('All')} className=' cursor-pointer'>All</li>
            <li className=' cursor-pointer'  onClick={()=>setCategoryTitle('Science')}  >Science</li>
            <li  className=' cursor-pointer' onClick={()=>setCategoryTitle('Frontend')}>Frontend</li>
            <li  className=' cursor-pointer' onClick={()=>setCategoryTitle('Backend')}>Backend</li>
           
            <li  className=' cursor-pointer' onClick={()=>setCategoryTitle('Devops')}>DevOps</li>
            <li className=' cursor-pointer'  onClick={()=>setCategoryTitle('Cloud')}>Cloud</li>
            <li className=' cursor-pointer'  onClick={()=>setCategoryTitle('more')}>more ++</li>
            

         </ul>

         <div>
            <form  className=' flex justify-center items-center'>
             
                <div > 
                
                {!token.accessToken? 
                 <Link to="/Sign-in" className=' flex gap-3  border-black p-3   items-center justify-center'>
                  <p>Sign in  {token.accesToken}</p>
                  <div className=' h-[3em] bg-slate-200/40 border-[.1px] justify-center flex items-center  w-[3em] rounded-full '>
                 
                    <FaUserPlus size={20} className=' h-[3em]'/> 
                </div>
                </Link>:<>
                <div className=' flex ml-5 justify-center items-center gap-3'>
                   <p className=' capitalize  font-bold text-[1.1em]'>Welcome {token.accessToken.userName}</p>
                <button onClick={(e)=>{
                  e.preventDefault()
                   navigate('/post')
                }} className=' mx-4 rounded-lg bg-slate-800 text-white p-3'>Add a Post</button>
                <button onClick={()=>  setToken("accessToken",'')} className=' mx-4 bg-red-500 text-white p-4 rounded-md '>Logout</button>

                </div>
               
                </>
              }
               
                  
                
                  
                </div>
               
       
            </form>
            
         </div>


       </nav>

  )
}

export default Navbar
