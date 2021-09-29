import axios from 'axios';
import { useState } from 'react';
import { getToken } from '../../Utils/common';


function UserChannels(){
    const [channels, setChannels] = useState([]);

    const data = () => {
        axios.get("http://206.189.91.54//api/v1/channels", {
            headers: getToken()
        }).then((res) => {
            setChannels(res.data);
        });
    }

    return (
        <div>
            <button onClick={data}>Show channels</button>
            <div>
                {/* arrayOfObjects.map(({ coffee, size }) => (
                <p>Coffee type {coffee} in a {size} size.</p>
                )); */}
            </div>
        </div>
    )
}
export default UserChannels;