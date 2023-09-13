const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilephoto:{
        type: String
    },
    following:[{
        user:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    followers:[{
        user:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        }
    }]
}, {timestamps:true})
userSchema.statics.signUp = async function(fullname, username, email, password){
    if(!email || !password || !fullname || !username){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    const UsernameExists = await this.findOne({ username })
    if(UsernameExists){
        throw Error('Entered username already exists.')
    } 
    const EmailExists = await this.findOne({ email })
    if(EmailExists){
        throw Error('Entered email address is already registered.')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({fullname, username, email, password: hash})
    return user
}

userSchema.statics.logIn = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled.')
    }
    const user = await this.findOne({ email })
    if(!user){
        throw Error('Incorrect email.')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password.')
    }
    return user
}
module.exports = mongoose.model("User", userSchema)
