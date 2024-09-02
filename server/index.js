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


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    cors({
      origin: [
        "https://portfolio-b5kt5v1o6-aditya-gargs-projects-f431692c.vercel.app",
        "http://localhost:5173",        
        "http://localhost:3000"        
      ],
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      credentials: true,
    })
  );
  
  app.use(bodyParser.json())  


  const allowedOrigins = [  
    "http://localhost:3001",
    "http://localhost:5173",    
    "https://portfolio-b5kt5v1o6-aditya-gargs-projects-f431692c.vercel.app",    
  
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


app.post("/admin/login",async(req,res)=>{
  try {
    const {email,password} = req.body;
    let user = await Admin.findOne({email});
    if (!user) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials (email)" });
    }   
    
    const passwordCompare = password === user.password
    if(!passwordCompare){
        success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials (password)" });
    }

    const data = {
        user: {
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, 'secrem_admin1');
      success = true;        
      res.status(204).json({ success, authtoken })
  } catch (error) {
    console.log(error)
    res.status(500).json("Internal Server Error")
  }
})

// app.use("/admin",userRoute)
app.use("/api/portfolio",portfolioRoute)


//connection
connectMongoDb(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB Connected")
})


app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})
