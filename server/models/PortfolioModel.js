const mongoose = require("mongoose")

const introSchema = new mongoose.Schema({
    welcomeText :{
        type: String,
        required : true
    },
    firstName :{
        type: String,
        required : true
    },
    lastName :{
        type: String,
        required : true
    },
    caption :{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true,
    },
    

    
},[{timestamps : true}])



const aboutSchema = new mongoose.Schema({
    lottieURL :{
        type: String,
        required : true
    },
    description1 :{
        type: String,
        required : true
    },
    description2 :{
        type: String,
        required : true
    },
    skills :{
        type: Array,
        required : true
    },
    
},[{timestamps : true}])



const projectsSchema = new mongoose.Schema({
    title :{
        type: String,
        required : true
    },
    description :{
        type: String,
        required : true
    },
    description2 :{
        type: String,
        required : true
    },
    image :{
        type: String,
        // required : true
    },
    link :{
        type: String,
        required : true
    },      
},[{timestamps : true}])


const contactSchema = new mongoose.Schema({
    Name :{
        type: String,
        required : true
    },
    Age :{
        type: String,
        required : true
    },
    Gender :{
        type: String,
        required : true
    },
    Email :{
        type: String,
        required : true
    },
    MobileNo :{
        type: String,
        required : true
    },
    Country :{
        type: String,
        required : true
    },
    
},[{timestamps : true}])


module.exports = {
    Intro : mongoose.model("intros",introSchema),
    About : mongoose.model("abouts",aboutSchema),
    Project : mongoose.model("projects",projectsSchema),
    Contact : mongoose.model("contacts",contactSchema)
}