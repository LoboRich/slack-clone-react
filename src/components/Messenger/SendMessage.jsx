import axios from "axios";
import { getToken } from "../../Utils/common";

const SendMessage = () => {

    const SendMessage = (e) => {
        e.preventDefault()
        axios.post('http://206.189.91.54//api/v1/messages', {
            headers: getToken(),
            data: {
                'receiver_id': 56,
                'receiver_class': 'User',
                'body': 'Whats up!' 
            }
            }).then((res) => {
                console.log(res.data)
            });
        }

    return ( 
        <div className="retrieve-wrapper">
            <button onClick={SendMessage}>Button</button>
        </div>
     );
}
 
export default SendMessage;