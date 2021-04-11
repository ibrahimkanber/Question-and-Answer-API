const express=require("express");
const dotenv=require("dotenv");
const connectDatabase=require("./helpers/database/connectDatabase");
const customErrorHandler=require("./middlewares/error/customErrorHandler")
const routers=require("./routers")
const app=express();
app.use(express.json());
const path=require("path");
var cors = require('cors');
app.use(cors());
// const auth=require("./routers/auth");
// const question=require("./routers/question");


////
dotenv.config({
    path:"./config/env/config.env"
})
///Mongo Db
connectDatabase()
////

const PORT = process.env.PORT
const NODE_ENV=process.env.NODE_ENV

app.get("/",(req,res)=>{
    res.send("Welcome you are at Home Page")
})

////

app.use("/api",routers);

// app.use("/api/auth",auth);

/////
app.use(customErrorHandler);
////
app.use(express.static(path.join(__dirname,"public")))

////
app.listen(PORT,()=>{
    console.log( `Server started on http://localhost:${PORT} :${NODE_ENV}`)
})