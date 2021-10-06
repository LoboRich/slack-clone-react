import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import './Channel.css'


function ChannelDetails(props) {
    const [details, setDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);

    useEffect(() => {
        axios.get("http://206.189.91.54//api/v1/channels/"+props.match.params.id, {
            headers: getToken()
        }).then((res) => {
            setDetails(res['data']['data']);
            setLoading(false);
        }).catch(error => {
            setErrors(error)
            setLoading(true)
        })
    },[details.length]);

    return <div className='details'>
        <button>Add Member</button>
        {!isLoading ? (
            details['channel_members'].map(detail => {
                const {channel_id, id, user_id} = detail;
                return (
                    <p key={id}>channel_id: {channel_id}, id: {id}, user_id: {user_id}</p>
                );
            })
        ): (
        <p>{isLoading}</p>
        )}
    </div>
}
export default ChannelDetails;