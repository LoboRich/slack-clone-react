import React from 'react'
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import './Channel.css'
import Members from './Members';
import lock from '../resources/lock.png'
import man from '../resources/man.png'
import nice from '../resources/nice.png'
import gamer from '../resources/gamer.png'
import { getDatabase, ref, onValue } from "firebase/database";
import { Channel } from '../../Utils/Api';

function ChannelDetails(props) {
    const db = getDatabase();
    const [details, setDetails] = useState([]);
    const [memberModal, setmemberModal] = useState(false)
    const [memCount, setMemCount] = useState(0)

    const channel_details = () => {
        Channel(props.channel_id, getToken())
            .then((res) => {
                setDetails(res['data']['data']);
                setMemCount(res['data']['data']['channel_members'].length)
            }).catch(error => {})
    }

    useEffect(() => {
        channel_details();
        const members = ref(db, '/members/'+props.channel_id);
        onValue(members, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            channel_details();
            
        });
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