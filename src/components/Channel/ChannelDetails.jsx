import React from 'react'
import axios from 'axios';
import MessageContainer from '../Messenger/MessengerContainer';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import { useHistory } from "react-router-dom";
import './Channel.css'
import Search from '../Search';


function ChannelDetails(props) {
    const history = useHistory();
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

    const addMember = () => {
        history.push('/add-members')
    }

    return <div className='details'>
        <div className="details-container">
            <div className="channel-header">
                <button onClick={addMember}>Add Member</button>
                <h1>{details['name']}</h1>
                    <div className="member-container">
                    {!isLoading ? (
                        details['channel_members'].map(detail => {
                            const {channel_id, id, user_id, } = detail;
                            return (
                                <Search user_id={user_id}/>  
                            );
                        })
                    ): (
                    <p>{isLoading}</p>
                    )}
                    </div>  
            </div>        
        </div>    
        <MessageContainer />
    </div>
    
}
export default ChannelDetails;