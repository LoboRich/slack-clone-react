import axios from 'axios';
import { useState } from 'react';
import './Registration.css'


const Registration = ({closeRegistration}) => {

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
            alert('Account Registered')
            closeRegistration(false)
          });
        };

    return ( 
        <div className='registration-wrapper'>
            <button onClick={()=>closeRegistration(false)}className='cancel-modal'>X</button>
            <form className='registration-form' action="">
                <input type="email" className='register-email' onChange={emailInput} placeholder=' Your Preferred Email'/>
                <input type="text" className='register-password' onChange={passwordInput}  placeholder=' Your Preferred Password'/>
                <input type="text" className='confirm-password' onChange={confirmpassInput}  placeholder=' Confirm Preferred Password'/>
                <button className='register-confirmation' onClick={registrationHandle}>Register</button>
                <div className="policy-wrapper">
                    <input className='term-check' type="checkbox" name="term-check" id="" /> 
                    <label className='terms' htmlFor="term-check">I agree to the <a className="slack-terms" href='https://slack.com/intl/en-ph/terms-of-service'>Slack Terms of Service</a> and <a className="slack-policy" href='https://slack.com/intl/en-ph/trust/privacy/privacy-policy'>Privacy Policy</a>.</label>
                </div>     
            </form>
        </div>
     );
}
 
export default Registration;