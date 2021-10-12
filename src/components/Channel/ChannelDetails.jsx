import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import { useHistory } from "react-router-dom";
import './Channel.css'
import Search from '../Search';
import Members from './Members';
import AddMembers from './AddMembers';
// import { firebase } from "../../Utils/firebase";

function ChannelDetails(props) {
    // const history = useHistory();
    const [details, setDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);
    const [memberModal, setmemberModal] = useState(false)

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
    },[props]);

    // const addMember = () => {
    //     history.push('/add-members')
    // }

    return  (
        <div className='header-content'>
            <span className='channel-name'den="true">{details['name']}</span>
            <div className="member-container"></div>
            <button onClick={()=>setmemberModal(true)}>Members</button>
            {memberModal && <div className="membersModal"><Members details={details} exitModal={setmemberModal}/></div>}
        </div>
    )
}
export default ChannelDetails;