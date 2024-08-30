const express = require("express")
const {connectMongoDb} = require('./connection')
const dotenv = require("dotenv")
const { Intro } = require("./models/PortfolioModel")
dotenv.config()
const portfolioRoute = require("./routes/PortfolioRoute")
const userRoute = require("./routes/UserRoute")
const cors = require("cors")
const bodyParser = require("body-parser")


const app = express()


app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://192.168.0.108:3000"
        "https://portfolio-aditya-gargs-projects-f431692c.vercel.app",
    
        
      ],
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      credentials: true,
    })
  );
  
  app.use(bodyParser.json())  


  const allowedOrigins = [  
    "http://localhost:3001",
    "http://192.168.0.108:3000"
    "https://portfolio-aditya-gargs-projects-f431692c.vercel.app"
    
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

app.use(express.json())
app.use(cors(
    
))

app.use("/api/portfolio",portfolioRoute)
app.use("/api/admin",userRoute)


//connection
connectMongoDb(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB Connected")
})


app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})