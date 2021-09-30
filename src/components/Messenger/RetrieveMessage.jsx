import axios from "axios";
import { getToken } from "../../Utils/common";

const RetrieveMessage = () => {

    const data = {
        'sender_id' : 809,
        'receievr_class': 'User',
        'receiver_id' : 809
    }

    const recieveData = (e) => {
        e.preventDefault()
        axios.get('http://206.189.91.54//api/v1/messages?receiver_class=User&receiver_id=1', data, {
        headers: getToken()
    }).then((res) => {
        console.log(res['data'])
    })
}

    return ( 
        <div className="retrieve-wrapper">
            <button onClick={recieveData}>Retrieve</button>
        </div>
     );
}
 
export default RetrieveMessage;