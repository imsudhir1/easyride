const express = require('express');
const app = express();
const port="3001";
const userRouter = require("./api/users/user.router");

app.use("/api/users", userRouter); 

 
// app.get("/api", (req, res) => {
//     res.json({
//         success:1,
//         message:"weldone your rest api is working"
//     })
// }) 

 
 
 







 


app.listen(3001,()=>{
    console.log("server is running at :" + 3001)
    });  
 