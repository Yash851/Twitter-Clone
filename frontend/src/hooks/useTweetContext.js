import { useContext } from "react";
import { TweetContext } from "../contexts/TweetContext";
export const useTweetContext = () => {
    const context = useContext(TweetContext)
    if(!context){
        throw Error("useTweetContext can only be used inside TweetsContexrtProvider")
    }
    return context
}