import axios from 'axios';
import { useState } from 'react';
import { setUserSession, getToken } from '../../Utils/common';
import './Login.css';
import Registration from './Registration';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [postModal, setModal] = useState(false)

    const history = useHistory();

    const emailAuthenticate = (e) => {
        setEmail(e.target.value)
    }

    const passwordAuthenticate = (e) => {
        setPassword(e.target.value)
    }

    const authenticateLogin = (e) => {
        e.preventDefault();
        axios.post("http://206.189.91.54//api/v1/auth/sign_in", {
           email: email,
           password: password
          }).then((res) => {
            setUserSession(res['headers'], res['data']);
            history.push("/Dashboard");
          });
    }

    const showUserList = (e) => {
        e.preventDefault();
        axios.get("http://206.189.91.54//api/v1/users", {
            headers: getToken()
        }).then((res) => {
            console.log(res.data)
        });
    }



    return ( 
        <div className="login-wrapper">
            <form className='login-form' action="">
                <div className="input-wrapper">
                    <h1>Sign in to your account</h1>
                    <input type="email" onChange={emailAuthenticate}/>
                    <input type="text" onChange={passwordAuthenticate}/>
                    <button onClick={authenticateLogin}>Login</button>
                </div>
            </form>
            {/* <button onClick={showUserList}>Show users</button> */}
            {postModal && <Registration />}
        </div>
     );
}
 
export default Login;



