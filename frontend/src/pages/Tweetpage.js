import { useEffect, useState, useRef } from "react";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import Like from "../components/Like";
import { FaRetweet, FaRegComment } from "react-icons/fa6"
import { BsBookmark } from "react-icons/bs";
import Tweets from "../components/Tweets";
import CommentModal from "../components/CommentModal";
import Commentbox from "../components/Commentbox";
import { useTweetContext } from "../hooks/useTweetContext";
const Tweetpage = ({ title }) => {
    const [tweet, setTweet] = useState(null)
    const [comments, setComments] = useState(null)
    const [comment, setComment] = useState(false)
    const { id } = useParams()
    const { tweets } = useTweetContext()
    const effectRan = useRef(false)
    const Id = useRef(null)
    useEffect(() => {
        if(effectRan.current === false || id !== Id.current){
            const fetchTweet = async () => {
                tweets.forEach((Tweet) => {
                    if (Tweet._id === id) {
                        Tweet.views = Tweet.views + 1
                        console.log(Tweet)
                        fetch('/api/tweet/' + id, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                author: Tweet.author._id,
                                content: Tweet.tweetMessage,
                                image: Tweet.tweetImg,
                                likes: Tweet.likes,
                                views: Tweet.views
                            })
                        })
                        setTweet(Tweet)
                        setComments(Tweet.comments)
                    }
                })
                
            }
            fetchTweet()
            return () => {
                effectRan.current = true
                Id.current = id
            }
        }
    }, [id, tweet])
    return (<div className="feed-container">
        <Topbar title={title} />
        {tweet && (<article className="tweetpage-tweet-container">
            <div className="tweet-user-div">
                <div className="profile-pic">
                    <img src={process.env.PUBLIC_URL + '/vettel.jpg'} />
                </div>
                <div className="tweet-heading">
                    <div className="tweetpage-inner-heading">
                        <span className="name">{tweet.author.fullname}</span>
                        <span className="username">@{tweet.author.username}</span>
                    </div>
                </div>
            </div>
            <div className="tweet">
                <div className="tweet-content">
                    <span>{tweet.content}</span>
                </div>
                {tweet.image && <img src={tweet.image} alt="img" className="tweet-img" />}
            </div>
            <div className="date-time-views">
                <time style={{ color: "rgb(83, 100, 113)", fontSize: "15px" }}>2:26 PM</time>
                <div>
                    <span className="dot">.</span>
                </div>
                <span className="digit">{tweet.views}<span className="stat-name"> Views</span></span>
            </div>
            <div className="tweet-stats">
                <div className="stat">
                    <span className="digit">6,150<span className="stat-name"> Retweets</span></span>
                </div>
                <div className="stat">
                    <span className="digit">6,150<span className="stat-name"> Quotes</span></span>
                </div>
                <div className="stat">
                    <span className="digit">{tweet.likes.length}<span className="stat-name"> Likes</span></span>
                </div>
                <div className="stat">
                    <span className="digit">6,150<span className="stat-name"> Bookmarks</span></span>
                </div>
            </div>
            <div className="tweetpage-tweet-options">
                <span onClick={(e) => e.stopPropagation()}>
                    <FaRegComment onClick={() => {
                        if (!comment)
                            setComment(true)
                        else
                            setComment(false)
                    }} className="fill-grey" />
                </span>
                <FaRetweet />
                <Like tweet={tweet} />
                <BsBookmark />
            </div>
            <Commentbox tweet={tweet} setComment={setComment} />
        </article>)}
        {comments && comments.map(comment => {
            const Tweet = tweets.find((tweet) => tweet._id === comment._id)
            return <Tweets key={Tweet._id} tweet={Tweet} />
        }
        )}
        {comment && (<CommentModal tweet={tweet} setComment={setComment} />)}
    </div>
    );
}

export default Tweetpage;