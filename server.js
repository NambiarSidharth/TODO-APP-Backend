const express = require("express");
const mongoose = require("mongoose");
const app =express()
//route specification
const bodyParser = require('body-parser');
const {mongoURI} = require("./config/config");

mongoose
  .connect(mongoURI,{ useNewUrlParser: true })
  .then(() => console.log('mongodb connected'))
  .catch(err => {
      console.log(err)
      console.log("rooe")
    });

app.get("/",(req,res)=>{
    res.status(200).json({message:"working"})
})
    

const port = process.env.PORT || 5000;
app.listen(port, () => {
      console.log("app listening on port:" + port);
});