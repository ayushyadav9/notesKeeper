const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../midleware/fetchuser");
const {OAuth2Client} = require("google-auth-library")
const mailgun = require("mailgun-js");
require('dotenv').config();

const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

const JWT_SECRET = process.env.JWT_SECRET_LOGIN;

const client = new OAuth2Client(process.env.OAUTH_CLIENT)


//Route 1
// create a post request at "api/auth/createUser"  no login required
router.post("/createUser",[
    //express validation of email,name, password
    body("email", "Enter a valid name").isEmail(),
    body("name", "Enter a valid email").isLength({ min: 3 }),
    body("password", "Password must be at least 5 characters").isLength({min: 5,}),
  ],
  async (req, res) => {
    let success=false
    //if there are error return bad req to response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check whether the user with same email exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry the user with this email alredy exists" });
      }
      //For activation
      // const token = jwt.sign({name:req.body.name,email:req.body.email,password:req.body.password},"acctivate123",{expiresIn:'10m'})
      // const emaildata = {
      //   from: 'noreply@gmail.com',
      //   to: req.body.email,
      //   subject: 'Account activation Link',
      //   html: `
      //     <h2> Please click the below link to activate your account</h2>
      //     <a>http://localhost:5000/api/auth/activate/${token}</a>
      //   `
      // };
      // mg.messages().send(emaildata, function (error, body) {
      //   if(error){
      //     return res.status(401).json({error});
      //   }
      //   else{
      //     return res.json({msg:"Check your Email"})
      //   }
      // });
      //create a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); //encrypted the password and added salt with it
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {id: user.id,},
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({ success,authToken });
      
      //if other errors
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

router.post('/activate',(req,res)=>{
  const {token} = req.body;
  if(token){
    jwt.verify(token,"acctivate123",async function(err,decodedToken){
      if(err){
        return res.status(400).json({error:"Incorrect or Expired Link"})
      }
      const {name,email,password}=decodedToken
      let user = await User.findOne({ email});
      if (user) {
        return res.status(400).json({ error: "Sorry the user with this email alredy exists" });
      }
      //creating User
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt); //encrypted the password and added salt with it
      user = await User.create({
        name: name,
        password: secPass,
        email: email,
      });
      const data = {
        user: {id: user.id,},
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({ success,authToken });
    })
  }
  else{
    res.json({error:"Something went wrong!!!"})
  }

})


//Route 2
// login a user by POST request at "api/auth/loginUser"  no login required
router.post("/login",[
    //express validation of email,name, password
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false
    //if there are error return bad req to response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success,error:"Please try to login with correct credentials"})
      }
      //compairing password with the password store in DB
      const passComp = await bcrypt.compare(password,user.password);
      if(!passComp){
        return res.status(400).json({ success,error:"Please try to login with correct credentials"})
      }

      const data = {
        user: {id: user.id,},
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success,authToken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal error occured");
    }
  }
);


//Route 3
//Get a user by POST request at "api/auth/getUser" login required
router.post("/getUser",fetchuser,async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findOne({userId}).select("-password")
      res.send(user)
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal error occured");
    }
});


//Route 4
//Google auth "api/auth/googleSignup" 
router.post("/googleSignup",async (req, res) => {
  try {
    const {tokenId}=req.body
    client.verifyIdToken({idToken: tokenId, audience:"420087876462-t4h4mpsa859b05f8mah08ci5us77isd5.apps.googleusercontent.com"}).then(response=>{
      const {email_verified,name,email} = response.payload;
      let success = false;
      if(email_verified){
        User.findOne({email}).exec(async (err,user)=>{
          if(err){
            return res.status(400).json({success,error: "Something ent wrong!!"})
          }else{
            if(user){
              //login the user
              const data = {
                user: {id: user.id,},
              };
              const authToken = jwt.sign(data, JWT_SECRET);
              success=true;
              return res.json({success,authToken})
            }else{
              //Sign up the user
              const password = email+JWT_SECRET;
              const salt = await bcrypt.genSalt(10);
              const secPass = await bcrypt.hash(password, salt);
              let newUser = new User({name:name,password:secPass,email:email})
              newUser.save((err,data)=>{
                if(err){
                  return res.status(400).json({success,error: "Something ent wrong!!"})
                }else{
                  const datajwt = {
                    user: {id: data.id,},
                  };
                  const authToken = jwt.sign(datajwt, JWT_SECRET);
                  success=true
                  return res.json({success,authToken})
                }
              })
            }
          }
        })
      }
    })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error occured");
  }
});


module.exports = router;
