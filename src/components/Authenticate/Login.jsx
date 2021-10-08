import axios from 'axios';
import { useState } from 'react';
import { setUserSession, getToken } from '../../Utils/common';
import Registration from './Registration';
import { useHistory } from "react-router-dom";
import fina from '../resources/fina.gif';
import google from '../resources/google.png';
import facebook from '../resources/facebook.png'
import styles from './Login.module.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [postModal, setModal] = useState(false)

    let history = useHistory();

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
          });
        }     
    
 
    return ( 

        <div className={styles.loginContainer}>
            <img className={styles.slackGif} src={fina} alt=""/>
            <form className={styles.loginForm} action="">
                <div className={styles.inputWrapper}>
                    <h1 className={styles.signHeader}>Sign in to your account</h1>
                    <h3 className={styles.bottomHeader}>Enter to your workspace</h3>
                    <button className={styles.loginGoogle}><img className={styles.googleIcon} src={google} alt="" srcset="" />  Sign in with Google</button>
                    <button className={styles.loginFacebook}><img src={facebook} alt="" className={styles.facebookIcon} />Sign in with Facebook</button>
                    <div className={styles.horizontalRule}>
                        <hr className={styles.hrLeft} />
                        <h3 className="or-word">OR</h3>
                        <hr className={styles.hrRight} />
                    </div>
                    <input type="email" className={styles.loginEmail} onChange={emailAuthenticate} placeholder=' Your E-mail'/>
                    <input type="text" className={styles.loginText} onChange={passwordAuthenticate} placeholder=' Your Password'/>
                    <button className={styles.loginButton} onClick={authenticateLogin}>Sign in with Email</button>
                    <h6 className={styles.registrationHeader}>Don't have an account? <span onClick={()=>setModal(true)} className={styles.registerButton}>Register Here</span></h6>
                </div>
            </form>
            {/* <button onClick={showUserList}>Show users</button> */}
            {postModal && <Registration />}
            <h6 className={styles.copyWrite}>Slack Clone - Avion Project</h6>
        </div>
     );
}
 
export default Login;



