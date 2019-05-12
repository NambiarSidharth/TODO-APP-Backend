let express = require("express");
let router = express.Router();
let mongoClient = require("mongodb").MongoClient;


//to get all the todos and the dones
router.get("/getData",(req,res)=>{
    mongoClient.connect("mongodb://localhost:27017/",{useNewUrlParser:true},(err,db)=>{
    if(!err){
        let dbo=db.db('tododb');
        dbo.collection("todos").find({}).toArray(function(err, result) {
            if (err) throw err;
            dbo.collection("dones").find({}).toArray(function(err1,result1){
                let data={
                    todos:result,
                    dones:result1
                }
                if (err1) throw err1;
                db.close();
            res.status(200).json({data:data})
            })
        });
    }else{
        res.status(400).json({error:err})

    }
    })
})

//to add Todo
router.get("/addTodo/:todo",(req,res)=>{
    let data=req.params.todo;
    mongoClient.connect("mongodb://localhost:27017/",{useNewUrlParser:true},(err,db)=>{
    if(!err){
        let dbo=db.db('tododb');
        dbo.collection("todos").insert({todo:data})
        .then(obj=>{
            db.close()
            res.status(200).json({message:"added successfully"})
        })
        .catch(err=>{
            db.close()

            res.status(400).json({error:err})
        })
    }else{
        res.status(400).json({error:err})
    }
    })
})

//add to dones
router.get("/addDone/:done/:id",(req,res)=>{
    let data=req.params.done;
    mongoClient.connect("mongodb://localhost:27017/",{useNewUrlParser:true},(err,db)=>{
    if(!err){
        let dbo=db.db('tododb');
        dbo.collection("dones").insert({todo:data})
        .then(obj=>{
            dbo.collection("todos").deleteOne({_id:req.params.id})
            .then(obj=>{
                db.close()
            res.status(200).json({message:"added to dones successfully"})
            })
            .catch(err=>{
                db.close()
                res.status(400).json({error:err})
            })
        })
        .catch(err=>{
            db.close()
            res.status(400).json({error:err})
        })
    }else{
        res.status(400).json({error:err})
    }
    })
})

//remove todos
router.get("/removeTodo/:todo",(req,res)=>{
    mongoClient.connect("mongodb://localhost:27017/",{useNewUrlParser:true},(err,db)=>{
    if(!err){
        let dbo=db.db('tododb');
            dbo.collection("todos").deleteOne({todo:req.params.todo})
            .then(obj=>{
                db.close()
            res.status(200).json({message:"removed from todos successfully"})
            })
            .catch(err=>{
                db.close()
                res.status(400).json({error:err})
            })
    }else{
        res.status(400).json({error:err})
    }
    })
})
//remove dones
router.get("/removeDone/:done",(req,res)=>{
    mongoClient.connect("mongodb://localhost:27017/",{useNewUrlParser:true},(err,db)=>{
    if(!err){
        let dbo=db.db('tododb');
            dbo.collection("dones").remove({done:req.params.done})
            .then(obj=>{
                db.close()
            res.status(200).json({message:"removed from dones successfully"})
            })
            .catch(err=>{
                db.close()
                res.status(400).json({error:err})
            })
    }else{
        res.status(400).json({error:err})
    }
    })
})
module.exports=router;