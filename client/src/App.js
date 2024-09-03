import React, { useEffect, useRef } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Loader from './components/Loader';
import {useDispatch, useSelector} from 'react-redux'
import { HideLoading, ReloadData, ShowLoading, setPortfolioData } from './redux/rootSlice';
import Admin from './pages/Admin';
import GetInTouch from './pages/Home/GetInTouch';
import Login from "./pages/Admin/login";








export const HOST = "https://portfolio-w0sm.onrender.com"

const App = () => {


  const {loading,portfolioData,reloadData} = useSelector((state)=> state.root)
  const dispatch = useDispatch()

  const getPortfolioData = async()=>{
    try {
      dispatch(ShowLoading(true))
      const response = await fetch(`${HOST}/api/portfolio/getPortfolioData`,{
        method:"get"
      });
      const data =  await response.json()
      dispatch(setPortfolioData(data))
      dispatch(ReloadData(false))
      dispatch(HideLoading(true))
    } catch (error) {
      dispatch(HideLoading(false))
    }
  }

  
  useEffect(()=>{
    if(!portfolioData){      
      getPortfolioData()
    }
    // eslint-disable-next-line
  },[portfolioData])

  useEffect(()=>{
    if(reloadData){
      getPortfolioData()
    }
    // eslint-disable-next-line
  },[reloadData])

  return (
    <>
    <BrowserRouter>
    {loading ? <Loader/> : null}
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/contact' element={<GetInTouch/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
