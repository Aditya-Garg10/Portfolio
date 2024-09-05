import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

const AdminIntro = () => {
  const HOST = "https://portfolio-w0sm.onrender.com"
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {    
      dispatch(ShowLoading());
      const response = await fetch(
        `${HOST}/api/portfolio/updateIntro`,
        { method: "PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: portfolioData.intro._id,...values})}                           
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
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText">
          <Input className="adminInput" placeholder="Intro"></Input>
        </Form.Item>
        <Form.Item name="firstName">
          <Input className="adminInput" placeholder="First Name"></Input>
        </Form.Item>
        <Form.Item name="lastName">
          <Input className="adminInput w-10" placeholder="Last Name"></Input>
        </Form.Item>
        <Form.Item name="caption">
          <Input className="adminInput w-10" placeholder="Caption"></Input>
        </Form.Item>
        <Form.Item name="description">
          <TextArea
            className="adminInput w-10"
            placeholder="Description"
          ></TextArea>
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

export default AdminIntro;
