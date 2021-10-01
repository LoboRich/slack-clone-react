import axios from "axios";
import { getToken } from "../../Utils/common";

const RetrieveMessage = () => {

    const retrieveData = (e) => {
        e.preventDefault()
        axios.get('http://206.189.91.54//api/v1/messages', {
            headers: getToken(),
            data: {
                'receiver_id': 1,
                'receiver_class': 'User',
                'body': 'Whats up!'
            }
            }).then((res) => {
                console.log(res.data)
            });
        }

    return ( 
        <div className="retrieve-wrapper">
            <button onClick={retrieveData}>Button</button>
        </div>
     );
}
 
export default RetrieveMessage;