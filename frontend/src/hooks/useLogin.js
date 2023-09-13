import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
    const [loginError, setError] = useState(null)
    const [loginIsLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const logIn = async (email, password) => {
        setIsLoading(true)
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setIsLoading(false)
            setError(null)
            dispatch({type: 'LOGIN', payload: json})
            navigate("/")
        }
    }
    return { logIn, loginError, loginIsLoading }
}