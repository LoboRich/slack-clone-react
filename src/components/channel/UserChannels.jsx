import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';

const channelDetails = (e) => {
    const channelId = e.target.id
    alert(channelId)
}

const ChannelList = () => {
    const [channels, setChannels] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);


    const fetchUserChannels = () => {
        axios.get("http://206.189.91.54//api/v1/channels", {
            headers: getToken()
        }).then((res) => {
            setChannels(res['data']['data']);
            setLoading(false);
        }).catch(error => {
            setErrors(error)
            setLoading(true)
        })
    }

    useEffect(() => {
        fetchUserChannels();
    });
  
    return <div className='channels'>
        {!isLoading ? (
            channels.map(channel => {
                const {id, name} = channel;
                return (
                    <div key={id}>
                        <p id={id} onClick={channelDetails}>{name}</p>
                    </div>
                );
            })
        ): (
        <p>{isLoading}</p>
        )}
    </div>

}
function UserChannels(){
    return (
        <ChannelList />
    )
}
export default UserChannels;