const jwt = require('jsonwebtoken')

const getAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1 h"})
}

const getRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn:"3 day"})
}

const verifyToken = (token, secret) =>{
    return jwt.verify(token, secret, (err, data)=>{
        if(err){
            return undefined
        }
        return data
    });
}

module.exports = {getAccessToken, getRefreshToken, verifyToken}