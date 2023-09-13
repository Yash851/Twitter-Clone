import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const Leftbar = () => {
    const user = true
    var val = ""
    useEffect(() => {
        if(user){
            val = document.getElementById("home")
        }
        else{
            val = document.getElementById("explore")
        }
    }, [])
    const handleClick = (e) => {
        if (val !== e.target && val !== "") {
            val.className = ""
            e.target.className = "active"
            val = e.target
        }
        else {
            val = e.target
            e.target.className = "active"
        }
    }
    return (
        <div className='leftbar-container'>
            
            {user && (<div style={{position:"fixed"}}>
            <Link to="/" className='logo-link'><img src={process.env.PUBLIC_URL + "/twitter.png"} alt="twitter logo" className="logo" /></Link>
            <Link to="/" className="active" id="home" onClick={handleClick} ><img src={process.env.PUBLIC_URL + "/home.png"} alt="Home icon" />Home</Link>
            <Link to="/explore" className="" onClick={handleClick} ><img src={process.env.PUBLIC_URL + "/hashtag.png"} alt="Explore icon" />Explore</Link>
            <Link to="/notifications" className="" onClick={handleClick}><img src={process.env.PUBLIC_URL + "/bell.png"} alt="notification icon" />Notifications</Link>
            <Link to="/messages" className="" onClick={handleClick}><img src={process.env.PUBLIC_URL + "/email.png"} alt="message icon" />Messages</Link>
            <Link to="/bookmarks" className="" onClick={handleClick}><img src={process.env.PUBLIC_URL + "/bookmark-white.png"} alt="bookmark icon" />Bookmarks</Link>
            <Link to="/profile" className="" onClick={handleClick}><img src={process.env.PUBLIC_URL + "/user.png"} alt="user icon" />Profile</Link>
        </div>)}
        {!user && (<div style={{position:"fixed"}}>
            <Link to="/" className='logo-link'><img src={process.env.PUBLIC_URL + "/twitter.png"} alt="twitter logo" className="logo" /></Link>
            <Link to="/" className="active" id="explore" onClick={handleClick}><img src={process.env.PUBLIC_URL + "/hashtag.png"} alt="hashtag" />Explore</Link>
            <Link to="/" className="" onClick={handleClick}><img src={process.env.PUBLIC_URL + "/setting.png"} alt="setting" />Settings</Link>
        </div>)}
        </div>
    )
}
export default Leftbar