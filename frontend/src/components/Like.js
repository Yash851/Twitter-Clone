import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { useTweetContext } from "../hooks/useTweetContext"
const Like = ({ tweet }) => {
    const { user } = useAuthContext()
    const [like, setLike] = useState(false)
    const { tweets, dispatch } = useTweetContext()
    useEffect(() => {
        if (user) {
            setLike(tweet.likes.includes(user._id))
        }
    },[user, tweet.likes])
    const handleClick = async () => {
        if (like) {
            setLike(false)
            tweet.likes = tweet.likes.filter(like => like !== user._id)
            const response = await fetch('/api/tweet/' + tweet._id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: tweet.author._id,
                    content: tweet.tweetMessage,
                    image: tweet.tweetImg,
                    likes: tweet.likes
                })
            })
            const json = await response.json()
            if (response.ok) {
                console.log(json)
                tweets.forEach((Tweet) => {
                    if (Tweet._id === tweet._id) {
                        Tweet.likes = Tweet.likes.filter(like => like !== user._id)
                        console.log(Tweet.likes)
                    }
                })
                dispatch({ type: 'SET_TWEETS', payload: tweets })
            }
        }
        else {
            setLike(true)
            const response = await fetch('/api/tweet/' + tweet._id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: tweet.author._id,
                    content: tweet.tweetMessage,
                    image: tweet.tweetImg,
                    likes: tweet.likes.concat(user._id)
                })
            })
            const json = await response.json()
            if (response.ok) {
                console.log(json)
                tweets.forEach((Tweet) => {
                    if (Tweet._id === tweet._id) {
                        Tweet.likes.push(user._id)
                        console.log(Tweet.likes)
                    }
                })
                dispatch({ type: 'SET_TWEETS', payload: tweets })
            }
        }
    }
    return (
        <>
            {like && (<FaHeart style={{ color: "red", cursor: "pointer" }} onClick={handleClick} />)}
            {!like && (<FaRegHeart className="fill-grey" onClick={handleClick} />)}
        </>
    )
}
export default Like;