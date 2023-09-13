import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const signUp = async(fullname, username, email, password) => {
        setIsLoading(true)
        const response = await fetch('/api/user/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fullname,
                username,
                email,
                password
            })
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setIsLoading(false)
            setError(null)
            dispatch({type:'LOGIN', payload: json})
            navigate("/")
            localStorage.setItem('user', JSON.stringify(json))
        }
    } 
    return {signUp, error, isLoading}
}
 
