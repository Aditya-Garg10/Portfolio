import {  Form, Input, Modal, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";


const AdminProject = () => {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;
  
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");
  

  const onFinish = async (values) => {
    try {    
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await fetch("http://localhost:8000/api/portfolio/updateProject", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: selectedItemForEdit._id, ...values }),
        });                
      } else {
        response = await fetch("http://localhost:8000/api/portfolio/addProject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }
      dispatch(HideLoading());
      const data = await response.json();
      console.log(data)
      if (data.success) {
        message.success(data.message);
        setShowAddEditModal(false);
        dispatch(HideLoading())
        dispatch(ReloadData(true))
        
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      
      dispatch(ShowLoading());
      const response = await fetch(`http://localhost:8000/api/portfolio/deleteProject/${item._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },      
      });
      const data = await response.json();
      console.log(data)
      if (data.success) {
        dispatch(HideLoading());
        dispatch(ReloadData(true))
        message.success(data.message);        
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {project.map((proj) => (
          <div className="shadow border p-5 border-gray-400 gap-5 flex flex-col">
            <h1 className="text-primary text-xl mb-2 text-center font-bold">{proj.title}</h1>
            <hr />
            <img src={proj.image} alt="" className="h-60 w-80 " />            
            <h1>{proj.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button className="bg-red-500 text-white px-5 py-2" onClick={()=>onDelete(proj)}>
                Delete
              </button>
              <button className="bg-primary text-white px-5 py-2" onClick={()=>{
                setSelectedItemForEdit(proj)
                setShowAddEditModal(true)
                setType("edit")
              }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
     {(type === "add" || 
     selectedItemForEdit ) && 
      <Modal
      open={showAddEditModal}
      title={selectedItemForEdit ? "Edit Project" : "Add Project"}
      onCancel={() => {
        setShowAddEditModal(false);
        setSelectedItemForEdit(null)
      }}   
      footer={null}     
    >
      <Form layout="vertical" onFinish={onFinish}  initialValues={{...selectedItemForEdit} || {}}
       >
        <Form.Item name="title">
          <Input className="adminInput w-10" placeholder="Title" />
        </Form.Item>
        <Form.Item name="description">
          <Input className="adminInput w-10" placeholder="Description" />
        </Form.Item>
        <Form.Item name="description2">
          <Input className="adminInput w-10" placeholder="Description2" />
        </Form.Item>
        <Form.Item name="image">
          <Input
            className="adminInput w-10"
            placeholder="Image"            
          />
        </Form.Item>
        <Form.Item name="link">
          <Input className="adminInput w-10" placeholder="Link" type="text" />
        </Form.Item>                
        <div className="flex justify-end">
          <button className="border-primary bg-white px-5 py-2 text-primary" onClick={()=>{setShowAddEditModal(false)}}>
            Cancel
          </button>
          <button type="submit" className="bg-primary px-5 py-2 text-white">
            {selectedItemForEdit ? "Update" : "Add"}
          </button>
        </div>
      </Form>
    </Modal>
     }
    </div>
  );
};

export default AdminProject;
