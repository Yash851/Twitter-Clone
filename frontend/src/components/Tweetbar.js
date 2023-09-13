import { useState } from "react";
import { useTweetContext } from "../hooks/useTweetContext";
import { useAuthContext } from "../hooks/useAuthContext";
const Tweetbar = () => {
    const {dispatch} = useTweetContext()
    const [tweetMessage, setTweetMessage] = useState("")
    const [tweetImg, setTweetImg] = useState(null)
    const { user } = useAuthContext()
    const handleClick = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/tweet/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                // displayName: "Yash Gandhi",
                // username: "yashgandhi",
                author: user._id,
                content: tweetMessage,
                image: tweetImg
            })
        })
        const json = await response.json()
        if(!response.ok){
            console.log(json.error)
        }
        if(response.ok){
            console.log(json)
            setTweetMessage("")
            setTweetImg(null)
            console.log('uploaded')
            dispatch({type: 'CREATE_TWEET', payload: json})
        }
    }
    const handleFileUpload = async(e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setTweetImg(base64)
        console.log(base64)
    }
    return ( <div className='tweet-box'>
    <form onSubmit={handleClick}>
        <div className="tweetbox-input">
        <img src={process.env.PUBLIC_URL + '/vettel.jpg'} className="avatar"/>
        <input 
        type='text'
        placeholder="What is happening?!"
        value={tweetMessage}
        onChange={e => setTweetMessage(e.target.value)}
        />
        </div>
        <div className="tweetbox-input">
        <label htmlFor="image-upload" className="upload-label">
        <img src = {process.env.PUBLIC_URL + "/upload.png"} alt="upload" />
        </label>
        <input 
        type="file"
        label="Image"
        name="image"
        id="image-upload"
        accept=".jpeg, .png, .jpg"
        onChange={handleFileUpload}
        />
        <button type="submit">Post</button>
        </div>
    </form>
</div> );
}
 
export default Tweetbar;

function convertToBase64(file){
    return new Promise((resolve,reject)=>{
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