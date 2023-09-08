const verifySignUp= require('../middleware/verifySignUp');
const authController=require('../controllers/authController')
const express = require('express');
const route = express.Router();
route.post('/signup',verifySignUp,(req,res,next)=>{
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
},authController.signUp);
route.post("/signin", authController.signIn);
route.post("/forgot-password",authController.forgetPassword);
route.post("/reset-password",authController.resetPassword);
module.exports=route;
