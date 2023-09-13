import Like from "./Like"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaChartSimple, FaRegBookmark, FaRegComment, FaRetweet } from "react-icons/fa6"
import CommentModal from "./CommentModal"
const Tweets = ({ tweet }) => {
    const navigate = useNavigate()
    const [comment, setComment] = useState(false)
    return (
        <article className="tweet-container" onClick={() => { navigate('/' + tweet.author.username + '/status/' + tweet._id) }}>
            <div className="profile-pic">
                <img src={process.env.PUBLIC_URL + '/vettel.jpg'} />
            </div>
            <div className="tweet">
                <div className="tweet-heading">
                    <div className="inner-heading">
                        <span className="name">{tweet.author.fullname}</span>
                        <span className="username">@{tweet.author.username}</span>
                        <div>
                            <span className="dot">.</span>
                        </div>
                        <time>7h</time>
                    </div>
                </div>
                <div className="tweet-content">
                    <span>{tweet.content}</span>
                </div>
                {tweet.image && <img src={tweet.image} alt="img" className="tweet-img" />}
                <div className="tweet-options">
                    <div className="tweet-option-container">
                        <div className="sub-container">
                            <span onClick={(e) => e.stopPropagation()}>
                                <FaRegComment onClick={() => {
                                    if (!comment)
                                        setComment(true)
                                    else
                                        setComment(false)
                                }} className="fill-grey" />
                            </span>
                            <span className="count">{tweet.comments.length}</span>
                        </div>
                    </div>
                    <div className="tweet-option-container">
                        <div className="sub-container">
                            <span><FaRetweet className="fill-grey" /></span>
                        </div>
                    </div>
                    <div className="tweet-option-container">
                        <div className="sub-container">
                            <div>
                                <span onClick={(e) => e.stopPropagation()}><Like tweet={tweet} /></span>
                            </div>
                            <span className="count">{tweet.likes.length}</span>
                        </div>
                    </div>
                    <div className="tweet-option-container">
                        <div className="sub-container">
                            <span><FaChartSimple className="fill-grey" /></span>
                            <span className="count">{tweet.views}</span>
                        </div>
                    </div>
                    <div className="tweet-option-container">
                        <div className="sub-container">
                            <span onClick={(e) => e.stopPropagation()}><FaRegBookmark className="fill-grey" /></span>
                        </div>
                    </div>
                </div>
                {comment && (<CommentModal tweet={tweet} setComment={setComment} />)}
            </div>
        </article>
    )
}
export default Tweets