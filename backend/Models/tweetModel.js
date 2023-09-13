const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tweetSchema = new Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    // displayName:{
    //     type: String
    // },
    // username: String,
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    comment: {
        type: Boolean,
        required: true,
        default: false
    },
    comments: [{
        // author: {
        //     type: mongoose.SchemaTypes.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        // content: String,
        // image: String
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Tweet',
        required: true
    }
    ],
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    }
    ],
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })
module.exports = mongoose.model("Tweet", tweetSchema)