const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');

const Register = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) 
           return res.status(422).json({ errors: errors.array() })
        const hash = bcrypt.hashSync(password, saltRounds = 10);
        const loginData = await Users.findOne({ email });
        if (!loginData) {
            const UsersData = await new Users({ name, email, password: hash }).save();
            if (UsersData)
                res.status(200).json("Registration successfull");
        } else {
            res.status(203).json("Email Already exists");
        }
    } catch (error) {
        console.log(error);
        res.status(404).json("Error occured")
    }

}

const Login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) 
           return res.status(422).json({ errors: errors.array() })
        const users = await Users.findOne({ email });
        if (users) {
          const password_check= bcrypt.compareSync(password, users.password); // true
            if (password_check) {
                var token= jwt.sign({
                    email:email,
                    name:users.name,
                }, '$event$', { expiresIn: '1h' });
                const {name}=jwt.verify(token, '$event$')
                res.status(200).json({token,status:'logged in',name,email});
            }
            else {
                res.status(404).send("user not found")
            }
        }
        else {
            res.status(404).send("user not found")
        }

    } catch (error) {
        console.log(error)
    }

}

module.exports={
    Register,Login
}