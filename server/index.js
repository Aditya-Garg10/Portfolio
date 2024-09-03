const express = require("express")
const {connectMongoDb} = require('./connection')
const dotenv = require("dotenv")
const { Intro } = require("./models/PortfolioModel")
const portfolioRoute = require("./routes/PortfolioRoute")
const userRoute = require("./routes/UserRoute")
const cors = require("cors")
const bodyParser = require("body-parser")
const Admin = require("./models/UserModel")
dotenv.config()
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    cors({
      origin: [
        "https://portfolio-b5kt5v1o6-aditya-gargs-projects-f431692c.vercel.app",
        "http://localhost:5173",        
        "http://localhost:3000",  
        "https://portfolio-nine-lac-78.vercel.app"      
      ],
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      credentials: true,
    })
  );
  
  app.use(bodyParser.json())  


  const allowedOrigins = [  
    "http://localhost:3001",
    "http://localhost:5173",    
    "https://portfolio-nine-lac-78.vercel.app",    
  
  ];
  
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  

const  port = process.env.PORT 
app.get("/",(req,res)=>{
    res.send("Hello")
   
})

app.post("/admin/send-email",async(req,res)=>{
  
  try {
    
  const {  email, message } = req.body;
  console.log(req.body)
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.email, // Replace with your email
          pass: process.env.Password,  // Replace with your email password
      },
  });

  console.log(process.env.email)
  // Mail options
  const mailOptions = {
      from: email,
      to: "gargaditya880@gmail.com", // Replace with recipient's email
      subject: `Message from ${email} from Portfolio`,
      text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          // return res.status(500).json({ error: 'Failed to send email' });
          console.log(error)
      }
      else{
        console.log(info.response)
        res.status(200).json({ success: 'Email sent successfully' });
      }
  });
  } catch (error) {
    console.log(error)
  }
});




// app.use("/api/admin",userRoute)
app.use("/api/portfolio",portfolioRoute)


//connection
connectMongoDb(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB Connected")
})


app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})
