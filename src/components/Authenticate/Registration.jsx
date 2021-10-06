import axios from 'axios';
import { useState } from 'react';
import './Registration.css'


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
            <div className="background-opacity"></div>
            <form className='registration-form' action="">
                <input type="email" className='register-email' onChange={emailInput} placeholder=' Your Preferred Email'/>
                <input type="text" className='register-password' onChange={passwordInput}  placeholder=' Your Preferred Password'/>
                <input type="text" className='confirm-password' onChange={confirmpassInput}  placeholder=' Confirm Preferred Password'/>
                <button className='register-confirmation' onClick={registrationHandle}>Register</button>
            </form>
        </div>
     );
}
 
export default Registration;