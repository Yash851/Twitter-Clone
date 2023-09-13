const mongoose = require('mongoose')
const Schema = mongoose.Schema
const likeSchema = new Schema({
    tweet_id:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Likes", likeSchema)