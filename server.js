const express = require("express");
const  mongoClient = require("mongodb").MongoClient
const main = require("./router/main");
const app =express()
//route specification
const bodyParser = require('body-parser');
app.get("/",(req,res)=>{
    res.status(200).json({message:"working"})
})
app.use("/api/todo",main);
const port = process.env.PORT || 5000;
app.listen(port, () => {
      console.log("app listening on port:" + port);
});