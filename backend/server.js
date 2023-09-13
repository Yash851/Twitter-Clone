require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const tweetRouter = require('./routes/tweetRoute')
const userRouter = require('./routes/userRoute')
const app = express()
app.use(express.json({limit: "10mb", extended: true}))
app.use('/api/tweet', tweetRouter)
app.use('/api/user', userRouter)
mongoose.connect(process.env.CONNECTION_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('server listening on port', process.env.PORT)
    })
})
.catch(err=>{
    console.log(err)
})
