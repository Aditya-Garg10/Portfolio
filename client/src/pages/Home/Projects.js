import React,{useState,useLayoutEffect, useRef} from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
const textRef = useRef()
  const {portfolioData} = useSelector((state)=> state.root)
  const { project } = portfolioData
  

  
   
  const [selectedItemIndex, setselectedItemIndex] = useState(0);
  useLayoutEffect(()=>{
    let ctx = gsap.context(()=>{},textRef);
    let tl5 = gsap.timeline({
          scrollTrigger:{
            trigger:textRef.current,            
            start:"-15%",
            end:"90%",
                
            // pin:true                                               
          }})          
          tl5.fromTo(".img1",{opacity:0},{opacity:1,ease:"power3.inOut"})
          tl5.fromTo(".hey1",{opacity:0,x:-5},{opacity:1,x:0,ease:"power3.inOut"}).fromTo(".hey",{opacity:0},{opacity:1}).fromTo(".hey2",{opacity:0,y:-10},{opacity:1,y:0})
          // tl7.from(".text",{opacity:0,y:-10}).fromTo(".text2",{opacity:0,y:-10},{opacity:1})
          // tl7.fromTo(".marquee",{opacity:0},{opacity:1,ease:"power4.in"})
    return () => ctx.revert()
  })

  return (
    <div className='my10' ref={textRef} >
      <SectionTitle title="Top Projects"/>

      <div  className="flex items-center py-10  gap-20  sm:flex-col">
        <div className='flex flex-col gap-10  w-fit border-l-2 border-neutral-500 
        sm:flex-row sm:overflow-x-scroll sm:border-0  sm:overflow-y-hidden sm:w-full'>{ project.map((dataa,index)=>(
            <div  key={index} onClick={()=>{
                setselectedItemIndex(index)                
            }} className='cursor-pointer  '>
                <h1  className={`text-lg  text-nowrap text-start sm:text-sm sm:w-full  py-3 px-10 ${selectedItemIndex === index? "text-quinary  font-semibold border-l-4 -ml-[3px] bg-[#ffffff]  w-fit sm:w-full border-quinary ":" text-white"}`}>{dataa.title}</h1>
            </div>
        )
       
        )}
        
        </div>

       <div  className='flex items-center   justify-center gap-10 sm:flex-col '>

        <img src={project[selectedItemIndex].image}  className='h-60 object-contain img1 w-72' alt="" />
       <div className='flex flex-col gap-5'>
        <h1 className="text-blue-500 hey1 text-2xl">{project[selectedItemIndex].title}</h1>        
        <p className='text-white hey'>{project[selectedItemIndex].description}</p>
        <p className='text-white hey2'>{project[selectedItemIndex].description2}</p>
        <a href={project[selectedItemIndex].link} className='text-secondary  text-wrap hey2'>{project[selectedItemIndex].link}</a>
        </div>
       </div>
       
      </div>
    </div>
  )
}

export default Projects
