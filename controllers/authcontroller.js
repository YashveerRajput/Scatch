const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const { connectDB } = require("../config/mongoose-connection");

module.exports.registerUser = async function (req, res) {
  //mongo db is schema less , agar koi bina yeh sab cheezen pass kiye bhi create user karega toh user banjayega and to prevent that we use JOY based validation but here we are not using it

  try {
    await connectDB();
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({email:email});
    if(user) return res.status(401).send("You already have an account , please login")
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    let token = generateToken(user);
    res.cookie("token",token);
    res.send("user created");
  } catch (err) {
    console.log(err.message);
    return res.status(503).send("Database unavailable. Please try again in a moment.");
  }
}

module.exports.loginUser = async function(req,res){
    try {
        await connectDB();

        //check ki user exists krta hai ya nahi
        let {email,password} = req.body;
        let user = await userModel.findOne({email:email});
        if(!user) return res.send("email or password incorrect");

        //comparing the password of the user
        const result = await bcrypt.compare(password, user.password);
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            return res.redirect("/shop");
        }

        return res.send("Email or Password incorrect")
    } catch (err) {
        console.log(err.message);
        return res.status(503).send("Database unavailable. Please try again in a moment.");
    }


};

module.exports.logout = function(req,res){
    res.cookie("token", "");
    res.redirect("/")
    
}