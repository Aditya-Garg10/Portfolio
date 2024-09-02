import React, { useState } from 'react'
import Smile from '../../assets/smile2.png'
import Image from '../../assets/image.png'
import { IoCloseSharp } from 'react-icons/io5'
import { IoMdArrowRoundDown } from 'react-icons/io'
import { FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import {HOST} from '../../App'
import { message } from 'antd'

const GetInTouch = () => {
  const [formData, setFormData] = useState({    
    email: '',
    message: '',
});
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async() =>{
  try {
    const reponse = await fetch(`${HOST}/api/admin/send-email`,{
      method: "POST",
    headers:{
      "Accept" : "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)})

    const data = await reponse.json()
    console.log(data)
    if(reponse.status === 200){
      message.success("Email Sent Successfully")
    }
  } catch (error) {
    message.error(error)
  }
}
  const [openResume, setOpenResume] = useState(false);
  return (
    <>
    
    {openResume &&
      <div className='fixed  z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col'>
      <div className='mt-7'>
        <img src={Image} className='h-[80vh]  w-full bg-contain ' alt="" />
      </div>
      <div className="flex gap-5 fixed top-0 mt-3 ">
        <button  className='bg-white/90 p-3 text-2xl rounded-full hover:bg-white/50 cursor-pointer transition-all duration-300'>
          <IoMdArrowRoundDown />
        </button>
        <button onClick={() => {
          setOpenResume(false);          
        }
        } className='bg-white/90 p-3 text-2xl rounded-full hover:bg-white/50 cursor-pointer transition-all duration-300'>

          <IoCloseSharp /> 
        </button>
      </div>
    </div>}
    {
      <div className="bg-zinc-950 flex flex-col h-full sm:h-screen sm:p-10 pt-10 p-20 w-full">
      <div className='flex justify-evenly sm:justify-between sm:p-5 items-center h-[10vh] sm:w-full w-2/6  bg-[#27272A]'>
        <h1 className=' font-semibold sm:text-sm flex items-center hover:text-blue-500 font-myFont gap-2 text-white'> <FaUserLarge  /> Aditya Garg</h1>
        <div className="flex">
        <Link to="/"><h1 className='text-white sm:text-xs py-2 cursor-pointer  hover:font-semibold px-4 hover:bg-[#454548]'>Home</h1></Link>
        <h1 onClick={()=>setOpenResume(!openResume)} className='text-white sm:text-xs py-2 cursor-pointer  hover:font-semibold px-4 hover:bg-[#454548]'>Resume</h1>
        </div>
      </div>
    <div className=' sm:flex-col mt-10 sm:mt-0 flex h-full w-full sm:p-5  '>
      <div className="flex sm:w-full justify-center  items-center w-1/2 sm:h-[20vh] h-screen">
        <h1 className='text-6xl font-myFont font-semibold sm:text-4xl   text-white  flex items-center justify-center gap-2 h-[20vh]'>Say Hello <img src={Smile} className='h-14' alt="" /> </h1>
      </div>
      <div className="flex  flex-col text-start justify-around items-start sm:p-5 sm:justify-center p-20 sm:w-full w-1/2 h-screen sm:h-[50vh] bg-[#27272A]">
        <h1 className='text-[#efe5e5]'>Dear Aditya,</h1>
        <div className='w-full sm:mt-14 text-white'>
        <input type="email" value={formData.email} onChange={handleChange} name='email' className='border-b-2 w-full focus:outline-none text-white  bg-transparent' />
        <p className='mt-3'>My mail address is</p>
       < input value={formData.message} onChange={handleChange} name="message" className='border-b-2 mt-5 w-full focus:outline-none text-white  bg-transparent' type="text" />
        <p  className='mt-3'>Regards</p>
        <button onClick={handleSubmit} className='text-black w-full font-bold font-myFont mt-5  py-2 bg-white'>Send</button>
        </div>
      </div>
    </div>
    </div>
    }
    
    </>
  )
}

export default GetInTouch
