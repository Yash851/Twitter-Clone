import { useState } from "react"
import Notification from "./Notification"
import useComment from "../hooks/useComment"
const Commentbox = ({ tweet, setComment }) => {
    const [tweetMessage, setTweetMessage] = useState("")
    const [tweetImg, setTweetImg] = useState(null)
    const [notify, setNotify] = useState(false)
    const postComment = useComment()
    const handleClick = async (e) => {
        e.preventDefault()
        await postComment(tweet, tweetMessage, tweetImg, setTweetMessage, setTweetImg, setComment, setNotify)       
    }
    const handleFileUpload = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setTweetImg(base64)
        console.log(base64)
    }
    return (<>
        {!notify && (<div className='comment-tweet-box' onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleClick}>
                <div className="tweetbox-input">
                <img src={process.env.PUBLIC_URL + '/vettel.jpg'} className="avatar"/>
                    <input
                        type='text'
                        placeholder="Tweet your reply"
                        value={tweetMessage}
                        onChange={e => setTweetMessage(e.target.value)}
                    />
                </div>
                <div className="tweetbox-input">
                    <label htmlFor="image-upload" className="upload-label">
                        <img src={process.env.PUBLIC_URL + "/upload.png"} alt="upload" />
                    </label>
                    <input
                        type="file"
                        label="Image"
                        name="image"
                        id="image-upload"
                        accept=".jpeg, .png, .jpg"
                        onChange={handleFileUpload}
                    />
                    <button type="submit">Tweet</button>
                </div>
            </form>
        </div>)}
        {notify && (<Notification />)}
    </>
    );
}

export default Commentbox;

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

