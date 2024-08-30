import React, { useLayoutEffect, useRef } from 'react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({title,}) => {

  const textRef = useRef()
  
  useLayoutEffect(()=>{
    let ctx = gsap.context(()=>{},textRef);
    let tl7 = gsap.timeline({
          scrollTrigger:{
            trigger:textRef.current,            
            start:"100% 70%",
            end:"300% 50%",  
            // pin:true                                 
          }})
         tl7.fromTo(".line",{opacity:0},{opacity:1})
    return () => ctx.revert()
  })
  
  return (
    <div ref={textRef}>
    <div className='flex gap-5  items-baseline py-8'>
      <h1 className='text-3xl text-tertiary font-semibold'>{title}</h1>
      <div className="w-60 line sm:w-20 h-[1px] bg-quinary "></div>
    </div>
    </div>
  )
}

export default SectionTitle
