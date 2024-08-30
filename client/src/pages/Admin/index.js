import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { Tabs } from "antd";
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import { useSelector } from 'react-redux';

import AdminProject from './AdminProject';
import AdminContact from './AdminContact';
import { useNavigate } from 'react-router-dom';





const Admin = () => {
  const navigate = useNavigate()

 

  useEffect(()=>{      
    if(!localStorage.getItem("auth-token")){
      navigate("/admin/login")
    }    
    // eslint-disable-next-line
  })

  const onChange = (key) => {
    console.log(key);
  };

  const {portfolioData} = useSelector((state)=> state.root)
  const items = portfolioData &&  [
    {
      key: '1',
      label: 'Intro',
      children: <AdminIntro/>,
    },
    {
      key: '2',
      label: 'About',
      children: <AdminAbout/>,
    },
    {
      key: '3',
      label: 'Project',
      children: <AdminProject/>,
    },
    {
      key: '4',
      label: 'Contact',
      children: <AdminContact/>,
    },
  ];
  
  return (
    <div>
        <Header  btnCon={"Home"} />
        <div className="mt-5 p-5">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>        
    </div>
  )
}

export default Admin
