import React from 'react'
import ReactDom from "react-dom"
import { FaX } from 'react-icons/fa6'
import Commentbox from './Commentbox'
export default function CommentModal({ tweet, setComment }) {
  return ReactDom.createPortal(
    <div className="backdrop" onClick={(e) => e.stopPropagation()}>
      <div className='commentmodal-container'>
        <FaX onClick={() => { setComment(false) }} />
        <div className='user-tweet'>
          <article>
            <div className="first-div">
              <div className="profile-pic">
                <img src={process.env.PUBLIC_URL + '/vettel.jpg'} />
              </div>
              <div className="line"></div>
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
            </div>
          </article>
          <div className='second-div'>
            <div className='first-div'>
              <div className='line'></div>
            </div>
            <div className='reply-to'>
              Replying to
              <span> @{tweet.author.username}</span>
            </div>
          </div>
          <div>
            <Commentbox tweet={tweet} setComment={setComment} />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}
