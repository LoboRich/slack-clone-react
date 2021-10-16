import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import './Channel.css'
import Members from './Members';
import lock from '../resources/lock.png'
import man from '../resources/man.png'
import nice from '../resources/nice.png'
import gamer from '../resources/gamer.png'

function ChannelDetails(props) {
    const [details, setDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);
    const [memberModal, setmemberModal] = useState(false)
    const [memCount, setMemCount] = useState(0)

    useEffect(() => {
        axios.get("http://206.189.91.54//api/v1/channels/"+props.channel_id, {
            headers: getToken()
        }).then((res) => {
            setDetails(res['data']['data']);
            setMemCount(res['data']['data']['channel_members'].length)
        }).catch(error => {
        })
    },[props]);

    return  (
        <div className='header-content'>
            <span className='channel-name'den="true">
                <img src={lock} alt="" className='lockIcon' />
                <span className="chName">{details['name']}</span>
            </span>
            <button className='memberBtn' onClick={()=>setmemberModal(true)}>
                <img src={man} alt="" className='memberAvatar ma1' />
                <img src={nice} alt="" className='memberAvatar ma2' />
                <img src={gamer} alt="" className='memberAvatar ma3' />
                <h5 className='MemberCount'>+{memCount}</h5>
            </button>
            {memberModal && <div className="membersModal">
                <Members details={details} exitModal={setmemberModal}/>
            </div>}
        </div>
    )
}
export default ChannelDetails;