const bcrypt = require('bcrypt');
const Users=require('../models/Users')
const jwt=require("jsonwebtoken")
const Register = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds=10);
        const UsersData = await new Users({ name, email, password:hash }).save();
        if (UsersData)
            res.json("Added successfully");
        else
            res.json("Error occured")
    } catch (error) {
        console.log(error)
    }

}

const Login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const users = await Users.findOne({ email });
        if (users) {
          const password_check= bcrypt.compareSync(password, users.password); // true
            if (password_check) {
                var token= jwt.sign({
                    email:email,
                    name:users.name,
                }, '$event$', { expiresIn: '1h' });
                const {name}=jwt.verify(token, '$event$')
                res.json({token,status:'logged in',name,email});
            }
        }
        else {
            res.json("user not found")
        }

    } catch (error) {
        console.log(error)
    }

}

module.exports={
    Register,Login
}