const express = require('express')
const { getTweets, getTweet, createTweet, updateTweet, deleteTweet, createComment } = require('../Controllers/tweetController')
const router = express.Router()
//getAllTweets
router.get('/', getTweets)
//getATweet
router.get('/:id', getTweet)
//createTweet
router.post('/', createTweet)
//update tweet
router.patch('/:id', updateTweet)
//delete tweet
router.delete('/:id', deleteTweet)
//create comment
router.post('/create-comment/:id', createComment)
module.exports = router