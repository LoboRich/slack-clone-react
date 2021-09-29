import axios from 'axios';
import { useState } from 'react';
import { setUserSession, getToken } from '../../Utils/common';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            <form action="">
                <label htmlFor="">E:Mail</label>
                <input type="email" onChange={emailAuthenticate}/>
                <label htmlFor="">Password</label>
                <input type="text" onChange={passwordAuthenticate}/>
                <button onClick={authenticateLogin}>Login</button>
            </form>
            <button onClick={showUserList}>Show users</button>
        </div>
     );
}
 
export default Login;