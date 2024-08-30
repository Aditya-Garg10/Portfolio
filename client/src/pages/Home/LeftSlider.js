import React from 'react'
import {  FaGithub,  FaInstagram, FaLinkedin, FaWhatsapp,  } from 'react-icons/fa'
import {  IoMail } from 'react-icons/io5'

const LeftSlider = () => {
  return (
    <>
    
    <div className='fixed bottom-0  sm:top-36 sm:bottom-30 right-0 sm:px-3 px-10'>
      <div className="flex gap-3 flex-col items-center">
    <div className="w-[1px] sm:h-24 lg:hidden 2xl:hidden sm:block h-32 bg-gray-400"></div>
      <div className="flex flex-col cursor-pointer gap-6">
        <FaWhatsapp  className='text-gray-400 sm:text-sm  hover:text-white text-xl' />
        <IoMail className='text-gray-400 sm:text-sm  hover:text-white text-xl' />
        <FaInstagram className='text-gray-400 sm:text-sm hover:text-white text-xl' />
        <FaLinkedin className='text-gray-400 sm:text-sm hover:text-white text-xl' />
        <FaGithub className='text-gray-400 sm:text-sm hover:text-white text-xl' />
      </div>
      <div className="w-[1px] sm:h-24 h-32 bg-gray-400"></div>
      </div>
    </div>
    </>
  )
}

export default LeftSlider
