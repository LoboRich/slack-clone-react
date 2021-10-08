import React from 'react'
import axios from 'axios';
import MessageContainer from '../Messenger/MessengerContainer';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import { useHistory } from "react-router-dom";
import './Channel.css'
import Search from '../Search';
import AddMembers from './AddMembers';


function ChannelDetails(props) {
    const history = useHistory();
    const [details, setDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);

    useEffect(() => {
        axios.get("http://206.189.91.54//api/v1/channels/"+props.channel_id, {
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

    return (
    <div className='details'>
        <div className="details-container">
            <div className="channel-header">
                <button onClick={addMember}>Add Member</button>
                {/* <span className='channel-name'><svg class="MuiSvgIcon-root sidebarOption__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>{details['name']}</span> */}
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
                    <AddMembers channel_id={props.match.params.id} />
            </div>        
        </div>    
        <MessageContainer />
    </div>
     );
}
   
export default ChannelDetails;