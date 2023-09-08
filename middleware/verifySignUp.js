const User = require('../models/user')
const verifySignUp =(req,res,next)=>{
const {username,password,email}=req.body;
if(!username||!password||!email){
return res.status(400).json({message:'All fields are required'});
}
if(!isValidEmail(email)){
return res.status(400).json({message:'Invalid email address'});
}
if(password.length<8){
return res.status(400).json({message:'Password must be at least 6 characters long'})
}
function isValidEmail(Email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(Email);
}
  // Username
  User.findOne({
    where: {
      username: username
    }
  }).then(result=>{
    if(result){
      res.status(400).json({
        message: "Failed! Username is already in use!"})
    }
    return;
  })
  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(result=>{
    if(result){
      res.status(400).json({
        message: "Failed! Email is already in use!"})
    }
    return;
  })

next();
}

module.exports=verifySignUp;
