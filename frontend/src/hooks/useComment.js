import { useAuthContext } from "./useAuthContext"
import { useTweetContext } from "./useTweetContext"
const useComment = () => {
    const { user } = useAuthContext()
    const { tweets, dispatch } = useTweetContext()
    const postComment = async (tweet, tweetMessage, tweetImg, setTweetMessage, setTweetImg, setComment, setNotify) => {
        const response = await fetch('/api/tweet/create-comment/' + tweet._id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: user._id,
                content: tweetMessage,
                image: tweetImg
            })
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            console.log(json)
            tweets.forEach((Tweet) => {
                if (Tweet._id === tweet._id) {
                    Tweet.comments.unshift(json)
                }
                console.log(Tweet.comments)
            })
            dispatch({ type: 'SET_TWEETS', payload: tweets })
            dispatch({ type: 'CREATE_TWEET', payload: json})
            setTweetMessage("")
            setTweetImg(null)
            setNotify(true)
            setTimeout(() => {
                setComment(false)
                setNotify(false)
            }, 3000)
            console.log('uploaded')
        }
    }
    return postComment;
}

export default useComment;