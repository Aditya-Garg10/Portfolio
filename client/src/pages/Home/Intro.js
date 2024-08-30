import React, {  useLayoutEffect, useRef } from 'react'
import {FaGithub} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {gsap} from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Intro = () => {
  const textRef= useRef()

  const {portfolioData} = useSelector((state)=> state.root)
  const {intro} = portfolioData
  const {firstName,lastName,welcomeText,description,caption} = intro

  // useLayoutEffect(()=>{
  //   let ctx = gsap.context(()=>{},textRef);
  //   let tl7 = gsap.timeline({
  //         scrollTrigger:{
  //           trigger:textRef.current,
  //           start:"top 0%",
  //           end:"300% 50%",
  //           markers : true,
  //           pin:true,
  //           scrub:0.2
  //         }})
  //         tl7.from(textRef.current,{x:-50,opacity:0})
  //   return () => ctx.revert()
  // })

  useLayoutEffect(()=>{
      let ctx = gsap.context(()=>{},textRef);
        let tl1 = gsap.timeline()
        tl1.from(".hello",{yPercent:-50,opacity:0,duration:0.4,ease:"power2.in"}).from(".name",{yPercent:-30,opacity:0,duration:0.4,ease:"power2.in"}).fromTo(".caption",{opacity:0,duration:0.4,ease:"power2.in"},{opacity:1}).from(".des",{opacity:0,duration:0.4,ease:"power2.in"}).from(".button",{opacity:0,duration:0.4,ease:"power2.in"})
        return () => ctx.revert()
  })

  // useGSAP(()=>{
  //   let tl7 = gsap.timeline({
  //     scrollTrigger:{
  //       trigger:"hiii",
  //       start:"50% 50%",
  //       end:"300% 50%",
  //       pin:true,
  //       scrub:1
  //     }
      
  //   })
   
  // },{scope:textRef})
  
  return (
    <div ref={textRef}>
    <div   className='h-[80vh]  sm:h-[60vh] xs:h-[85vh]  md:h-[60vh] gap-8  flex flex-col items-start justify-center py-10'>
      <h1 className='text-tertiary ml-2 hello' >{welcomeText || ""}</h1>
      <h1 className='text-blue-500 sm:text-3xl name md:text-5xl font-semibold text-7xl '>{firstName || ""} {lastName || ""}</h1>
      <h1 className='text-tertiary caption sm:text-2xl md:text-4xl font-semibold text-6xl '>{caption || ""}</h1>
      <p className='text-tertiary des w-3/4'>{description || ""}</p>
      <button className='border-2 button text-lg hover:bg-transparent hover:text-blue-500 hover:border-blue-500 border-white bg-white px-6 py-3 flex items-center gap-2'>GitHub<FaGithub/></button>
    </div>
    </div>
  )
}

export default Intro
