import axios from "axios";
import { getToken } from "../../Utils/common";
import RetrieveMessage from "./RetrieveMessage";

const SendMessage = () => {

    const data = {
        'receiver_id': 809,
        'receiver_class': 'User',
        'body': 'From Rich!' 
    }
    const SendMessage = (e) => {
        e.preventDefault()
        axios.post('http://206.189.91.54//api/v1/messages', data, {
            headers: getToken()
        })
        .then((res) => {
            console.log(res['data']['data'])
        });
    }

    return ( 
        <div className="retrieve-wrapper">
            <button onClick={SendMessage}>Button</button>
        </div>
     );
}
 
export default SendMessage;