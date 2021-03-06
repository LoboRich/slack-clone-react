import { useState } from 'react';
import { setUserSession } from '../../Utils/common';
import './Login.css';
import Registration from './Registration';
import { useHistory } from "react-router-dom";
import fina from '../resources/fina.gif';
import google from '../resources/google.png';
import facebook from '../resources/facebook.png'
import {SignIn} from '../../Utils/Api'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [postModal, setModal] = useState(false)
    const [errors, setErrors] = useState(false);

    const history = useHistory();
    const data = {
        'email': email,
        'password': password
    }

    const authenticateLogin = (e) => {
        e.preventDefault();
        SignIn(data)
            .then(res => {
                setUserSession(res['headers'], res['data']['data']);
                history.push('/home')
            }).catch(err => setErrors('Invalid Credentials. Please try again'))
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
                    <span className="logCreateChannel">{ errors ? errors : null}</span>
                    <input type="email" role='input' name='email' className='login-email' onChange={(e)=>setEmail(e.target.value)} placeholder='Your E-mail'/>
                    <input type="password" className='login-text' onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
                    <button className='login-button' onSubmit={(e)=>setPassword(e.target.value)}>Sign in with Email</button>
                    <h6 className='registration-header'>Don't have an account? <span onClick={()=>setModal(true)} className='register-button'>Register Here</span></h6>
                </div>
            </form>
            {/* <button onClick={showUserList}>Show users</button> */}
            {postModal && <Registration closeRegistration={setModal} />}
            <h6 className="copy-write">Slack Clone - Avion Project</h6>
        </div>
     );
}
 
export default Login;



