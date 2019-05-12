const express = require("express");
const main = require("./router/main");
let cors = require("cors");
const app =express()
//route specification
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// app.use(function(req,res,next){
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials',true)
//     next();
// });
app.get("/",(req,res)=>{
    res.status(200).json({message:"working"})
})
app.use("/api/todo",main);
const port = process.env.PORT || 5000;
app.listen(port, () => {
      console.log("app listening on port:" + port);
});