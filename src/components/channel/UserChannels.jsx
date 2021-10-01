import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import './Channel.css'

const ChannelList = () => {
    const [channels, setChannels] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);

    useEffect(() => {
        axios.get("http://206.189.91.54//api/v1/channels", {
            headers: getToken()
        }).then((res) => {
            setChannels(res['data']['data']);
            setLoading(false);
        }).catch(error => {
            setErrors(error)
            setLoading(true)
        })
    },[channels.length]);
  
    return <div className='channels'>
        {hasError ? <p>{hasError.message}</p> : null}
        {!isLoading ? (
            channels.map(channel => {
                const {id, name} = channel;
                return (
                    <a href={'/channel-details/'+id} key={id}></a>
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