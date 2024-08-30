import React from 'react'
import {useNavigate} from 'react-router-dom'

const Footer = () => {
  

  const navigate = useNavigate()
  const handleNavigateToAdmin = ()  =>{
    navigate("/admin")
  }
  return (
    <div className='py-10'>
      <div className="h-[1px] w-full bg-gray-700 "></div>
     
      <div className="flex items-center flex-row gap-2 mt-10 opacity-70 justify-center">
      <h1 className="text-white">
         Developed By
      </h1>
        <h1 className="text-white">
            <p onDoubleClick={handleNavigateToAdmin} className="text-quinary cursor-not-allowed">Aditya Garg</p>
        </h1>
      </div>
    </div>
  )
}

export default Footer
