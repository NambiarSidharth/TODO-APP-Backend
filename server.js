const express = require("express");
const  mongoClient = require("mongodb").MongoClient
const app =express()
//route specification
const bodyParser = require('body-parser');
const {mongoURI} = require("./config/config");
app.get("/",(req,res)=>{
    res.status(200).json({message:"working"})
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
      console.log("app listening on port:" + port);
});