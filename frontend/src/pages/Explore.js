import Tweets from '../components/Tweets'
import Topbar from '../components/Topbar'
const Explore = ({ title }) => {
    return (
        <div className='feed-container'>
            <Topbar title={title} />
            <Tweets />
        </div>
    )
}
export default Explore