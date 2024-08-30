import React, { useEffect, useRef } from 'react'
import Header from '../../components/Header'
import Intro from './Intro'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import LeftSlider from './LeftSlider'
import { useSelector } from 'react-redux'




const Home = () => {

 

  

  const {portfolioData} = useSelector((state)=> state.root)
  return (
    <div className='h-screen' >
    
      <Header/>
    {portfolioData && (
      <div className='bg-primary px-28  sm:px-10 w-full'>
      <Intro/>
      <About/>
      <Projects/>
      <Contact/>
      <Footer/>
      <LeftSlider />
    </div>
    )}
    
    </div>
  )
}

export default Home
