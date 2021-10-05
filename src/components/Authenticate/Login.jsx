import axios from 'axios';
import { useState } from 'react';
import { setUserSession, getToken } from '../../Utils/common';
import './Login.css';
import Registration from './Registration';
import { useHistory } from "react-router-dom";
import fina from '../resources/fina.gif'

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
            history.push("/");
          });
    }
 
    return ( 
        <div className="login-wrapper">
            <img className='slack-gif' src={fina} alt="" srcset="" />
            <form className='login-form' action="">
                <div className="input-wrapper">
                    <h1>Sign in to your account</h1>
                    <input type="email" className='login-email' onChange={emailAuthenticate}/>
                    <input type="text" className='login-text' onChange={passwordAuthenticate}/>
                    <button className='login-button' onClick={authenticateLogin}>Login</button>
                </div>
            </form>
            {/* <button onClick={showUserList}>Show users</button> */}
            {postModal && <Registration />}
        </div>
     );
}
 
export default Login;



