import AddMembers from './AddMembers';
import './Channel.css'
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import { useHistory } from "react-router-dom";
import './Channel.css'
import Search from '../Search';


const Members = (props) => {

    const history = useHistory();
    const [details, setDetails] = useState(props.details);

    const newDM = (user_id) => {
        history.push('/users/User/'+user_id)
    }

    useEffect(()=>{
        setDetails(props.details)
    },[props])

    return ( 
        <div className="membersContainer">
            <button onClick={()=>props.exitModal(false)} className='exitModalMember'>X</button>
            <h4>Current members of this Channel</h4>
            <div className="membersForm">
                <div className="otherButtons">
                    <button>STAR</button>
                    <button>GET Notification</button>
                    <button></button>
                </div>
                <div className="memberNow">
                {
                    <Search user_id={details['channel_members'].map(detail => detail.user_id)}/>
                }
                </div>
                <AddMembers channel_id={props.details.id} />
            </div>
        </div>
     );
}
 
export default Members;