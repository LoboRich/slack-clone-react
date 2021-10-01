import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import CreateChannel from './CreateChannel';

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
  
    return <div>
        <h1>User Channels</h1>
        {hasError ? <p>{hasError.message}</p> : null}
        {!isLoading ? (
            channels.map(channel => {
                const {id, name} = channel;
                return (
                    <p key={id} id={id} onClick={channelDetails}>{name}</p>
                );
            })
        ): (
        <p>{isLoading}</p>
        )}
    </div>

}
function UserChannels(){
    return (
        <div>
            <ChannelList />
            <CreateChannel />
        </div>
    )
}
export default UserChannels;