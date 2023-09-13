import { createContext, useReducer } from 'react'
export const TweetContext = createContext();
const tweetsReducer = (state, action) => {
    switch(action.type){
        case 'SET_TWEETS':{
            return{
                tweets: action.payload
            }
        }
        case 'CREATE_TWEET':{
            return{
                tweets: [action.payload, ...state.tweets]
            }
        }
        default:{
            return state
        }
    }
}
export const TweetContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tweetsReducer,{
        tweets:null
    })
    return(
        <TweetContext.Provider value={{...state, dispatch}}>
            {children}
        </TweetContext.Provider>
    )
} 