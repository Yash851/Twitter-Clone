const mongoose = require('mongoose')
const Tweet = require('../Models/tweetModel')
//get all tweets
const getTweets = async(req, res)=>{
    const tweets = await Tweet.find({}).populate("author").populate({
        path: 'comments',
        populate: {path: 'author', model: 'User'}
    }).sort({createdAt: -1})
    if(!tweets){
        return res.status(400).json({error: 'Could not fetch any tweets.'})
    }
    res.status(200).json(tweets)
}

//get a single tweet
const getTweet = async(req, res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such tweet exists.'})
    }
    const tweet = await Tweet.findById(id).populate("author")
    const tweetComments = await Tweet.findById(id, "comments").sort({createdAt: -1}).populate({
        path: 'comments',
        populate: {path: 'author', model: 'User'}
    })
    if(!tweet){
        return res.status(400).json({error:'Could not fetch tweet'})
    }
    res.status(200).json({tweet,tweetComments})
}

//create a tweet
const createTweet = async(req, res)=>{
    const { author, content, image } = req.body
    const emptyFields = []
    if(!content){
        emptyFields.push("content")
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill content.', emptyFields})
    }
    try{
        await Tweet.create({author, content, image, likes: [], comments: []})
        const tweet = await Tweet.findOne({author, content}).populate("author")
        res.status(200).json(tweet)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//update a tweet
const updateTweet = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such tweet exists.'})
    }
    const tweet = await Tweet.findByIdAndUpdate({_id: id}, {...req.body})
    if(!tweet){
        return res.status(400).json({error: 'Cannot update tweet'})
    }
    res.status(200).json(tweet)
}

//delete a tweet
const deleteTweet = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such tweet exists.'})
    }
    const tweet = await Tweet.findByIdAndDelete(id)
    if(!tweet){
        return res.status(400).json({error: 'Cannot delete tweet'})
    }
    res.status(200).json(tweet)
}

//create comment
const createComment = async(req, res) => {
    const {id} = req.params
    const {author, content, image} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such tweet exists.'})
    }
    try{
        await Tweet.create({author, content, image, comment: true, likes: [], comments: []}).then(async result => {
            const tweet = await Tweet.findById({_id: id})
            tweet.comments = tweet.comments.concat([result._id])
            await tweet.save()
            result.populate("author").then(comment => {
            res.status(200).json(comment)
            })
        })
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
module.exports = { getTweets, getTweet, createTweet, updateTweet, deleteTweet, createComment }