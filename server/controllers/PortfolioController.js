const { Intro, About, Project, Contact } = require("../models/PortfolioModel");

const getData = async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const contacts = await Contact.find();

    res.status(200).json({
      intro: intros[0],
      about: abouts[0],
      project: projects,
      contact: contacts[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateIntro = async (req, res) => {
  try {    
    
    const intro = await Intro.findOneAndUpdate({_id: req.body._id},req.body,{new:true});
    res.status(200).json({
      data: intro,
      success: true,
      message: "Intro update Successfully",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateAbout = async(req,res)=>{
  try {    
    const about = await About.findOneAndUpdate({_id: req.body._id},req.body,{new:true});
    res.status(200).json({
      data: about,
      success: true,
      message: "About update Successfully",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}


const updateContact = async(req,res)=>{
  try {    
    const contact = await Contact.findOneAndUpdate({_id: req.body._id},req.body,{new:true});
    res.status(200).json({
      data: contact,
      success: true,
      message: "Contacts update Successfully",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const addProject =  async(req,res)=>{
  try {    
    const project =  Project.create(req.body);
    res.status(200).json({
      data: project,
      success: true,
      message: "Project created Successfully",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}


const updateProject =  async(req,res)=>{
  try {    
    const project = await Project.findOneAndUpdate(
      {_id:req.body._id},
      req.body,
      {new: true}
    );
    res.status(200).json({
      data: project,
      success: true,
      message: "Project updated Successfully",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const deleteProject = async(req,res) =>{
  try {          
    const project = await Project.findByIdAndDelete(
      { _id: req.params.id}
    );
    res.status(200).json({      
      success: true,
      data : project,
      message: "Project deleted Successfully",
    });
  } catch (error) {
    res.status(500).send("Internal  Error");
  }
}


  




module.exports = { updateProject,getData, updateIntro,deleteProject ,updateAbout,updateContact,addProject};
