import axios from 'axios';
import { useState } from 'react';


const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')

    const emailInput = (e) => {
        setEmail(e.target.value)
    }

    const passwordInput = (e) => {
        setPassword(e.target.value)
    }

    const confirmpassInput = (e) => {
        setConfirmPassword(e.target.value)
    }

    const inputData = {
        "email": email,
        'password': password,
        'password_confirmation': confirm_password
    }

    const registrationHandle = (e) => {
        e.preventDefault()
        axios({
            method: "post",
            url: "http://206.189.91.54//api/v1/auth/",
            data: inputData,
          }).then((res) => {
            console.log(res);
          });
        };

    return ( 
        <div className='registration-wrapper'>
            <form action="">
                <label htmlFor="">E-Mail</label>
                <input type="email" onChange={emailInput}/>
                <label htmlFor="">Password</label>
                <input type="text" onChange={passwordInput}/>
                <label htmlFor="">Confirm-Password</label>
                <input type="text" onChange={confirmpassInput}/>
                <button onClick={registrationHandle}>Register</button>
            </form>
        </div>
     );
}
 
export default Registration;