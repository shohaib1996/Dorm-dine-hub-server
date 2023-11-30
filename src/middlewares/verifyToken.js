const jwt = require('jsonwebtoken')

require('dotenv').config()

const verifyToken = async (req, res, next) => {
    console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = req.headers.authorization.split(' ')[1]
    // console.log("tok tok token", token) ;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded
        next()
    })

}

module.exports = verifyToken