import React, { useEffect, useLayoutEffect, useRef } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import gsap from "gsap";
import Photo from '../../assets/myPhoto.jpg'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);
const About = () => {
  const textRef = useRef(null)

  const {portfolioData} = useSelector((state)=> state.root)
  const {about} = portfolioData
  const {skills,lottieURL,description1,description2} = about

  
   const useIsomorphicLayoutEffect = 
   typeof window !== "undefined"?
   useLayoutEffect : useEffect;
   
  useEffect(()=>{
    let ctx = gsap.context(()=>{
      let tl7 = gsap.timeline({
        scrollTrigger:{
          trigger:textRef.current,            
          // start:"top 10%",
          end:"50%",                  
          pin:true,                               
        }})          
        tl7.from(".trigger ",{opacity:0,duration:0.2})
        tl7.from(".text",{opacity:0,y:-10}).fromTo(".text2",{opacity:0,y:-10},{opacity:1})
        tl7.fromTo(".marquee",{opacity:0},{opacity:1,ease:"power4.in"})
      },textRef);
      return () => ctx.revert()
    
  },[])
  
  ScrollTrigger.defaults({
    markers:true
  })
  return (
    <div ref={textRef}>
      <SectionTitle title="About" />

      <div  className="flex w-full trigger  md:flex-col sm:flex-col gap-10 items-center">
        <div className="h-[65vh] w-1/3 sm:h-[40vh] justify-center sm:w-full items-center flex  md:h-[50vh]">
          <img src={Photo} className="h-[50vh] sm:h-[35vh]  sm:object-cover object-contain rounded-sm" alt="" />
          {/* <dotlottie-player 
          
            src={lottieURL}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player> */}
          
        </div>
        <div className="flex-col  w-2/3 md:w-full gap-10  flex ">
          <p className="text-white text">{description1}</p>
        <p className="text-white text2">{description2}</p>
        </div>
        
      </div>
      <div className="pt-2 pb-10 sm:py-20">
          <h1 className="text-white text-xl">Few technologies, I've been working with recently:</h1>
        <div className="overflow-hidden marquee" >
        <div  className="flex mt-5 flex-row overflow-hidden flex-wrap gap-10 ">
       {skills.map((skill,index)=>{
          return <div key={index} className="h-full parent flex cursor-context-menu hover:bg-primary hover:border-blue-500 border-2  overflow-hidden  bg-[#dfdbdb]  py-3 px-8">
            <h1 className="text-black font-semibold child ">{skill}</h1>
          </div>
        })}
       </div>
        </div>
       
       </div>
    </div>
  );
};

export default About;
