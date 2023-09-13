import { useEffect } from 'react';
import Tweets from '../components/Tweets'
import Topbar from '../components/Topbar';
import Tweetbar from '../components/Tweetbar';
import { useTweetContext } from '../hooks/useTweetContext';
const Home = ({ title }) => {
    const {tweets, dispatch} = useTweetContext()
    useEffect(()=>{
        const fetchTweets = async() => {
            const response = await fetch('/api/tweet')
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_TWEETS', payload: json})
                console.log(json)
            }
        }
        fetchTweets()
    },[])
    return (<div className="feed-container">
        <Topbar title={title} />
        <Tweetbar />
        {tweets && tweets.map(tweet =>{
            if(tweet.comment === false){
              return <Tweets key={tweet._id} tweet={tweet} />
            }
        } 
        )}
    </div>);
}

export default Home;

