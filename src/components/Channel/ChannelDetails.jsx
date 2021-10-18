import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { getToken } from '../../Utils/common';
import './Channel.css'
import Members from './Members';
import lock from '../resources/lock.png'
import man from '../resources/man.png'
import nice from '../resources/nice.png'
import gamer from '../resources/gamer.png'
import { getDatabase, ref, onValue } from "firebase/database";
import { Channel } from '../../Utils/Api';

function useOutsideAlerter(ref, setmemberModal) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setmemberModal(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function ChannelDetails(props) {
    
    const db = getDatabase();
    const [details, setDetails] = useState([]);
    const [memberModal, setmemberModal] = useState(false)
    const [memCount, setMemCount] = useState(0)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setmemberModal);

    const channel_details = () => {
        Channel(props.channel_id, getToken())
            .then((res) => {
                setDetails(res['data']['data']);
                setMemCount(res['data']['data']['channel_members'].length)
            }).catch(error => {})
    }

    useEffect(() => {
        channel_details();
        const member = ref(db, '/member/'+props.channel_id);
        onValue(member, (snapshot) => {
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
                <div className="membersContainer" ref={wrapperRef}>
                    <Members details={details} exitModal={setmemberModal}/>
                </div>
            </div>}
        </div>
    )
}
export default ChannelDetails;