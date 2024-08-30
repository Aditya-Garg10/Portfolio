import React, { useLayoutEffect, useRef } from 'react'
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from 'react-redux';
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const {portfolioData} = useSelector((state)=> state.root)
  const {contact} = portfolioData  

  const textRef = useRef()
  
  useLayoutEffect(()=>{
    let ctx = gsap.context(()=>{},textRef);
    let tl3 = gsap.timeline({
          scrollTrigger:{
            trigger:textRef.current,            
            start:"-20%",
            end:"30%",                 
            pin:true                                      
          }})          
          tl3.fromTo(".keys",{opacity:0,x:-50},{opacity:1,x:0,ease:"power3.inOut"})
          tl3.fromTo(".contact ",{opacity:0,x:50},{opacity:1,duration:1,x:0,ease:"power3.inOut"})
    return () => ctx.revert()
  })
  

  return (
    <div className='mt-10' ref={textRef}>
      <SectionTitle title="Details Summary"/>

      <div  className="flex justify-around   flex-row sm:flex-col-reverse">
        <div className='flex flex-col keys gap-1 '>
        <h1 className='text-white  text-lg'>{`{`}</h1>
        {Object.keys(contact).map((key,index)=>(
          key !== "_id" &&  <h1 className='ml-6 text-lg' key={index}>
            <span className='text-white '>{key} :</span>  {" "} <span className='text-blue-500'>{contact[key]}</span>
            </h1>
        ))}
        <h1 className='text-white text-lg'>{`}`}</h1>
        

        </div>
        <div className="h-[45vh] contact  mb-10">
        <dotlottie-player className=""  src="https://lottie.host/e96288e4-aa55-4f91-8501-ba4105cb358f/aDDNeK7ctw.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
        </div>
    
      </div>
    </div>
  )
}

export default Contact
