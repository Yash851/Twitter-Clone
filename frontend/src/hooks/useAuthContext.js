import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw Error('useAuthContext can only be used inside AuthContextProvider')
    }
    return context;
}
 