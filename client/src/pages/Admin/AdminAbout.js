import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import { HOST } from "../../App";

const AdminAbout = () => {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {    
      const tempSkills = values.skills.split(" , ")
      values.skills = tempSkills
      dispatch(ShowLoading());
      const response = await fetch(
        `${HOST}/api/portfolio/updateAbout`,
        { method: "PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: portfolioData.about._id,...values})}                           
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
      <div>
      <Form
        onFinish={onFinish}
        className="px-10 py-2"
        initialValues={{
          ...portfolioData.about,
          skills :  portfolioData.about.skills.join(" , ")
        }}
      >
        <Form.Item name="lottieURL">
          <Input className="adminInput" placeholder="Lottie URL"></Input>
        </Form.Item>       
        <Form.Item name="description1">
          <TextArea
            className="adminInput w-10"
            placeholder="Description"
          ></TextArea>
        </Form.Item>
        <Form.Item name="description2">
          <TextArea
            className="adminInput w-10"
            placeholder="Description"
          ></TextArea>
        </Form.Item>
        <Form.Item name="skills">
          <Input
            className="adminInput w-10"
            placeholder="Skills"
          ></Input>
        </Form.Item>
        <div className="flex justify-start">
          <button type="submit" className="px-5 py-2 bg-primary text-white">
            Save
          </button>
        </div>
      </Form>
    </div>
    </div>
  )
}

export default AdminAbout
