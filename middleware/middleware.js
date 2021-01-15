const jwt=require('jsonwebtoken')

const check_auth = (req,res,next) => {
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token)
        var decoded = jwt.verify(token, '$event$');
        // console.log(decoded)
        next();
    } catch (err) {
        console.log(err)
        console.log("unauthorized")
        // res.send('<h1>Session Expired</h1>')
        return res.status(401).send('<h1>Session Expired</h1>')

      }
}

module.exports = {
    check_auth
}