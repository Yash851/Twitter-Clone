const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const userSignup = async(req, res) => {
    const { fullname, username, email, password } = req.body
    try{
        const user = await User.signUp(fullname, username, email, password)
        const token = createToken(user._id)
        const _id = user._id
        res.status(200).json({_id, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}
const userLogin = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.logIn(email, password)
        const token = createToken(user._id)
        const _id = user._id
        res.status(200).json({_id, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }   
}

module.exports = {userSignup, userLogin}