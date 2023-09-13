import { Link } from 'react-router-dom'
const Rightbar = () => {
    return (
        <div className="rightbar-container">
            <div className="rightbar-widget">
                <span className='heading'>New to Twitter?</span>
                <span className='sub-text'>Sign up now to get your own personalized timeline!</span>
                <Link className='create-account-link' to="/signup">Create account</Link>
            </div>
        </div>
    )
}
export default Rightbar