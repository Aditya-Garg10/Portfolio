import { Form, Input, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import {HOST} from '../../App'

const AdminContact = () => {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);
  

  const onFinish = async (values) => {
    try {    
      dispatch(ShowLoading());
      const response = await fetch(
        `${HOST}/api/portfolio/updateContact`,
        { method: "PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: portfolioData.contact._id,...values})}                           
      );      
      const json = await response.json();      
      if(json.success){
        message.success(json.message) 
        dispatch(HideLoading())       
      }
      else{
        message.error(response.data)
      }
    } catch (error) {
      console.log(error)
      dispatch(HideLoading())
    }
    
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        className="px-10 py-2"
        initialValues={portfolioData.contact}
      >
        <Form.Item name="Name">
          <Input className="adminInput" placeholder="Name"></Input>
        </Form.Item>
        <Form.Item name="Age">
          <Input className="adminInput" placeholder="Age"></Input>
        </Form.Item>
        <Form.Item name="Gender">
          <Input className="adminInput w-10" placeholder="Gender"></Input>
        </Form.Item>
        <Form.Item name="Email">
          <Input className="adminInput w-10" placeholder="Email"></Input>
        </Form.Item>
        <Form.Item name="MobileNo">
        <Input className="adminInput w-10" placeholder="Mobile No."></Input>
        </Form.Item>
        <Form.Item name="Country">
        <Input className="adminInput w-10" placeholder="Country"></Input>
        </Form.Item>
        <div className="flex justify-start">
          <button type="submit" className="px-5 py-2 bg-primary text-white">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdminContact;
