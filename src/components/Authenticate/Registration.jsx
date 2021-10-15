import axios from 'axios';
import { useState } from 'react';
import './Registration.css'
import {SignUp} from '../../Utils/Api'

const Registration = ({closeRegistration}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState(false);

    const inputData = {
        "email": email,
        'password': password,
        'password_confirmation': confirm_password
    }

    const registrationHandle = (e) => {
        e.preventDefault();
        SignUp(inputData)
            .then(res => {
                if(res.message == undefined){
                    closeRegistration(false)
                }else{
                   setErrors(res['response'].data.errors.full_messages[0])
                } 
            })
    };

    return ( 
        <div className='registration-wrapper'>
            <button onClick={()=>closeRegistration(false)}className='cancel-modal'>X</button>
            
            <form className='registration-form' onSubmit={registrationHandle}>
                <p style={{color: "red", marginBottom: '2vh'}}>{errors ? errors : null}</p>
                <input type="email" className='register-email' onChange={(e)=>setEmail(e.target.value)} placeholder=' Your Preferred Email'/>
                <input type="password" className='register-password' onChange={(e)=>setPassword(e.target.value)}  placeholder=' Your Preferred Password'/>
                <input type="password" className='confirm-password' onChange={(e)=>setConfirmPassword(e.target.value)}  placeholder=' Confirm Preferred Password'/>
                <button className='register-confirmation' onSubmit={registrationHandle}>Register</button>
                <div className="policy-wrapper">
                    <input className='term-check' type="checkbox" name="term-check" id="" /> 
                    <label className='terms' htmlFor="term-check">I agree to the <a className="slack-terms" href='https://slack.com/intl/en-ph/terms-of-service'>Slack Terms of Service</a> and <a className="slack-policy" href='https://slack.com/intl/en-ph/trust/privacy/privacy-policy'>Privacy Policy</a>.</label>
                </div>     
            </form>
        </div>
     );
}
 
export default Registration;