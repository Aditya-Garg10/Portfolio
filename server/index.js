const express = require("express")
const {connectMongoDb} = require('./connection')
const dotenv = require("dotenv")
const { Intro } = require("./models/PortfolioModel")
const portfolioRoute = require("./routes/PortfolioRoute")
const userRoute = require("./routes/UserRoute")
const cors = require("cors")
const bodyParser = require("body-parser")
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




app.use("/admin",userRoute)
app.use("/api/portfolio",portfolioRoute)


//connection
connectMongoDb(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB Connected")
})


app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})
