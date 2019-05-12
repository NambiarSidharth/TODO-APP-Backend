let express = require("express");
let router = express.Router();
let mongoClient = require("mongodb").MongoClient;
router.get("/getData",(req,res)=>{
    res.status(200).json({message:"getData"})
})