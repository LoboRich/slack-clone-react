import axios from 'axios';
import { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailAuthenticate = (e) => {
        setEmail(e.target.value)
    }

    const passwordAuthenticate = (e) => {
        setPassword(e.target.value)
    }

    const userInput = {
        'email': email,
        'password': password
    }

    const authenticateLogin = (e) => {
        e.preventDefault()
        axios({
            method: "post",
            url: "http://206.189.91.54//api/v1/auth/sign_in",
            data: userInput,
          }).then((res) => {
            console.log(res);
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
        </div>
     );
}
 
export default Login;