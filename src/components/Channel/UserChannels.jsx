import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import './Channel.css'
import {FetchUserChannels} from '../../Utils/Api'

const UserChannels = () => {
    const [channels, setChannels] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);

    useEffect(() => {
        FetchUserChannels(getToken())
            .then(res => {
                if(res['data']['data'] === undefined){
                    return
                }else{
                    setChannels(res['data']['data'])
                }
            }).catch(error => {
                setErrors(error)
                setLoading(true)
            })
    },[]);

    return <div className='channels'>
        {hasError ? <p>{hasError.message}</p> : null}
        {!isLoading ? (
            channels.map(channel => {
                const {id, name} = channel;
                return (
                    <a href={'/channel-details/'+id} key={id}>{name}</a>
                );
            })
        ): (
        <p>{isLoading}</p>
        )}
    </div>

}

export default UserChannels;