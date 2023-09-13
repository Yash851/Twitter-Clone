import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import ReactDom from "react-dom"
const Modal = () => {
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(false)
    const { signUp, error, isLoading } = useSignup()
    const { logIn, loginError, loginIsLoading } = useLogin()
    const navigate = useNavigate();
    const handleClick = async(e) => {
        e.preventDefault()
        if(e.target.id === "signup"){
            await signUp(fullname, username, email, password)
        }
        if(e.target.id === "signin"){
            await logIn(email, password)
        }
    }
    return ReactDom.createPortal(
        <div className="modal-background">
            <div className="modal-container">
                <div className="titleCloseBtn">
                    <button className="closeBtn" onClick={() => navigate(-1)}>X</button>
                </div>
                {!login && (
                    <div className="body">
                    <h1 className="modal-title">Create your account</h1>
                    <form id="signup" onSubmit={handleClick}>
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Name"
                            maxLength="50"
                        />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <div>
                        <span>Already have an account? <span onClick={()=>setLogin(true)} style={{cursor: "pointer", color:"rgb(29, 155, 240)", fontWeight: "500"}}>Sign in</span></span>
                        </div>
                        <button type="submit" disabled={isLoading} className={(fullname && username && email && password)?'btnActive':'btnInActive'}>Sign Up</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                    </div> 
                )}
                {login && (
                    <div className="body">
                    <h1 className="modal-title">Sign in to Twitter</h1>
                    <form id="signin" onSubmit={handleClick}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <div>
                            <span>Don't have an account? <span onClick={()=>setLogin(false)} style={{cursor: "pointer", color:"rgb(29, 155, 240)", fontWeight: "500"}}>Sign up</span></span>
                        </div>
                        <button type="submit" disabled={loginIsLoading} id="signin" className={(email && password)?'btnActive':'btnInActive'}>Sign In</button>
                        {loginError && <div className="error">{loginError}</div>}
                    </form>
                    </div> 
                )}
            </div>
        </div>,
        document.getElementById('portal')
    );
}

export default Modal;