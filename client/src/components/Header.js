import React,{useState } from 'react'
import { FaBars } from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { IoCloseSharp } from 'react-icons/io5'
import { IoMdArrowRoundDown } from 'react-icons/io'
import Image from '../assets/image.png'

gsap.registerPlugin(ScrollToPlugin);


const Header = (props) => {
  const navigate = useNavigate()

  const [isOpen, setisOpen] = useState(false);
  const handletoggle = () =>{
    setisOpen(!isOpen)    
  }

  const handleClick = () =>{
    navigate("/")
  }
  const handleHomeClick = () =>{
    navigate("/contact")
  }
  const handleAbout = () =>{
    gsap.to(window,{scrollTo: 610,scrollBehavior:"smooth",ease:"back.inOut"})
    
    
  }
  const handleResume = () =>{
    setOpenResume(!openResume)
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
    <div className=''>
    <div className='py-5 bg-primary  px-10 flex align-middle justify-between'>
        <div className="flex gap-3 items-center">        
        <h1 className="text-tertiary flex text-5xl  font-semibold sm:text-xl  font-myFont"><p className='text-blue-500'>A </p> <p className='text-blue-500'>G</p></h1>
        </div>
            
        <div className="flex sm:hidden pr-5 items-center text-1xl gap-12">
            <button onClick={handleAbout} className='text-tertiary'>{"About me"}</button>
            <button onClick={handleResume} className='text-tertiary'>{"Resume"}</button>
            <button className=' font-semibold p-2 pr-3 pl-3 hover:bg-white bg-[#27272A] text-white rounded-sm hover:text-quinary hover:border-blue-500' onClick={props.btnCon ? handleClick : handleHomeClick}> {props.btnCon || "Get in touch!" }</button>
        </div>
        
            <button onClick={handletoggle} className='text-tertiary toggle-btn md:hidden lg:hidden 2xl:hidden sm:block'><FaBars/></button>
    </div>
    {isOpen?
      <div className={`bg-[#27272A]  absolute  h-[5vh] px-5 w-full flex-2 flex items-center justify-center`}>
        <div className="flex sm:flex sm:text-xs pr-5 py-14 flex-row items-center text-1xl gap-12">
            <button onClick={handleAbout} className='text-tertiary hover:bg-[#454548]'>{"About me"}</button>
            <button onClick={handleResume} className='text-tertiary hover:bg-[#454548]'>{"Resume"}</button>
            <button className=' font-semibold sm:p-1  sm:rounded-none p-2 pr-3 pl-3 hover:bg-fifth bg-[#27272A] text-black rounded-full'  onClick={props.btnCon ? handleClick : handleHomeClick}> {props.btnCon || "Get in touch!" }</button>
        </div>
      </div>
      :<></>}
      </div>
      </>
  )
}

export default Header
