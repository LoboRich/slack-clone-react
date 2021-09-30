import axios from "axios";
import { getToken } from "../../Utils/common";

const CreateChannel = () => {

    const data = {
        "name": "Riche's Wasap",
        "user_ids": [53,54,142]
    }

    const create = (e) => {
        e.preventDefault()
        axios.post('http://206.189.91.54//api/v1/channels', data, {
            headers: getToken()
        })
        .then((res) => {
            console.log(res['data'])
        });
    }

    return ( 
        <button onClick={create}>Add Channel</button>
     );
}
 
export default CreateChannel;