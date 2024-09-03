import React, { useState } from 'react'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Tooltip, Button, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import { HOST } from '../App';


const Login = () => {

  const [data, setdata] = useState({
    email : "",
    password : ""
  });

  

  const navigate = useNavigate();

  const changeHandler = (e) =>{    
    setdata({...data,[e.target.name]:e.target.value})
  }

  const handleLogin = async(e) =>{
    e.preventDefault();    
    const response = await fetch(`${HOST}/api/admin`,{
      method: "GET",
      headers:{
        Accept : 'application/json',
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
    })

    const info = await response.json()
    console.log(info)


    if(info.success){
      localStorage.setItem('auth-token',info.authtoken)
      message.success("LoggedIn Successfully")
      navigate("/admin")      
    }
    else{
      message.error(info.error)
    }
  }
  return (
    <div className='w-full h-screen p-0'>
      <div className="flex  items-center justify-center h-full w-full">
        <div className="flex justify-center gap-3 flex-col items-center h-4/5 rounded-3xl w-3/4 shadow-2xl border-1 border-gray-900">
          <h1 className='font-myFont  text-3xl font-semibold text-blue-900'>Admin Login</h1>
          <div className="flex md:flex-col md:h-[50vh]] items-center justify-center gap-3   flex-row h-[60vh] w-full px-10">
            <div className='w-1/2 md:w-full'>
              <dotlottie-player src="https://lottie.host/a7962071-4b70-4198-8777-ee73f4b300bb/EM3HML88SU.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
            </div>
            <div className="flex px-20 md:w-full md:px-0 justify-center items-center w-1/2 gap-8 flex-col">
              <Input
                placeholder="Enter your username"
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                  <Tooltip title="Enter Admin Credentials Only">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                value={data.email}
                onChange={changeHandler}
                name='email'
              />              
              <Input.Password
              className='px-5'
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={data.password} onChange={changeHandler}
                name='password'
              />
              <Button onClick={handleLogin}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
