const Role = require('../models/role');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const config = require("../util/auth");
const signUp = (req,res,next)=>{
    //console.log(req.body.password);
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        email:req.body.email
    }).then(user=>{
        if(req.body.roles){
            Role.findAll({
                where:{name:{
                    [Op.or]:req.body.roles
                }}
            }).then(roles=>{
                console.log(roles);
                user.setRoles(roles).then(() => {
                    res.send({ message: "User was registered successfully!" });
                  });
            })
        }else{
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered successfully!" });
              });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
      });

   // next();

}

const signIn =(req,res,next)=>{
    //find user from Db
    User.findOne({where:{
        email:req.body.email
    }}).then(user=>{
        //check user if not found return not found
        if(!user){
            return res.status(404).send({ message: "User Not found." });
        }
 //if found check password bcrypt.compareSync false return it
 const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }
  const token = jwt.sign({ id: user.id },
    config.secret,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
    let authorites=[]
    user.getRoles().then(roles=>{
        for (let i = 0; i < roles.length; i++) {
            authorites.push("ROLE_" + roles[i].name.toUpperCase());
          }
          console.log(authorites);
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorites,
            accessToken: token
          });

    }).catch(err=>{
        res.status(500).send({ messages: err.message });
    })

    })

}
//send request with {email:xxx@dd.com}
const forgetPassword =(req,res,next)=>{
    User.findOne({
        where:{
email:req.body.email
        }
    }).then(user=>{
        if(user){
            const resetToken = jwt.sign({ email: user.email },config.secret, { expiresIn: '1h' });
res.json({resetToken:resetToken})

        }else{
            res.json({message:"this email not exist"})
        }
  // Generate a reset token JWT with user's email


    }).catch(err=>{
        res.status(500).send({ messages: err.message });
    })
}
//send {email,resetToken,newPassword}
const resetPassword =(req,res,next)=>{
    const decodedToken = jwt.verify(req.body.resetToken, config.secret);
console.log(decodedToken);
    User.findOne({ where: { email: decodedToken.email } }).then(user=>{

    if (!user) {
        res.json({message:"this User not exist"})
      }
       // Hash the new password and update the user's password
       console.log(req.body.newPassword);
       const hashedPassword =  bcrypt.hashSync(req.body.newPassword, 8);
       res.json({decode:hashedPassword})
       user.password = hashedPassword;
        user.save();

})


}
const authController={
    signIn:signIn,
    signUp:signUp,
    forgetPassword:forgetPassword,
    resetPassword:resetPassword
}

module.exports=authController
