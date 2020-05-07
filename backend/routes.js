var router = require("express").Router();

// retrive all classes from db
router.get("/test",(req,res){
  res.json({message: "well arrived"});
});


// app.use("/api/...");
