import axios from 'axios';
import { useState } from 'react';
import { setUserSession } from '../../Utils/common';
import './Login.css';
import Registration from './Registration';
import { useHistory } from "react-router-dom";
import fina from '../resources/fina.gif';
import google from '../resources/google.png';
import facebook from '../resources/facebook.png'

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
            setUserSession(res['headers'], res['data']['data']);
            history.push("/");
          });
    }
 
    return ( 
        <div className="login-wrapper">
            <img className='slack-gif' src={fina} alt=""/>
            <form className='login-form' onSubmit={authenticateLogin}>
                <div className="input-wrapper">
                    <h1 className='sign-in-header'>Sign in to your account</h1>
                    <h3 className="bottom-header">Enter to your workspace</h3>
                    <button className="login-google"><img className='google-icon' src={google} alt=""  />  Sign in with Google</button>
                    <button className="login-facebook"><img src={facebook} alt="" className="facebook-icon" />Sign in with Facebook</button>
                    <div className="horizontal-rule">
                        <hr className='hr-left' />
                        <h3 className="or-word">OR</h3>
                        <hr className='hr-right' />
                    </div>
                    <input type="email" className='login-email' onChange={emailAuthenticate} placeholder=' Your E-mail'/>
                    <input type="text" className='login-text' onChange={passwordAuthenticate} placeholder=' Your Password'/>
                    <button className='login-button' onSubmit={authenticateLogin}>Sign in with Email</button>
                    <h6 className='registration-header'>Don't have an account? <span onClick={()=>setModal(true)} className='register-button'>Register Here</span></h6>
                </div>
            </form>
            {/* <button onClick={showUserList}>Show users</button> */}
            {postModal && <Registration />}
            <h6 className="copy-write">Slack Clone - Avion Project</h6>
        </div>
     );
}
 
export default Login;



