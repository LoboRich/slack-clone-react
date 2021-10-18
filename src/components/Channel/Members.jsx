import AddMembers from './AddMembers';
import './Channel.css'
import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Channel.css'
import Search from '../Search';
import star from '../resources/star.png'
import bell from '../resources/alarm.png'
import call from '../resources/call.png'

const Members = (props) => {
    const history = useHistory();
    const [details, setDetails] = useState(props.details);
    useEffect(()=>{
        setDetails(props.details)
    },[props])

    return ( 
        <div className="membersContainer">
            <button onClick={()=>props.exitModal(false)} className='exitModalMember'>X</button>
            <h4 className='modalTitle'>Current members of this Channel</h4>
            <div className="membersForm">
                <div className="otherButtons">
                    <button className='starBtn'><img src={star} alt="" srcset="" className='starIcon'/>Favorite</button>
                    <button className='getBtn'><img src={bell} alt="" srcset="" className='bellIcon' />Notification</button>
                    <button className='callBtn'><img src={call} alt="" srcset="" className='callIcon'/>Start a Call</button>
                </div>
                <div className="memberNow">
                    <Search user_id={details['channel_members'].map(detail => detail.user_id)}/>
                </div>
                <AddMembers channel_id={props.details.id} />
            </div>
        </div>
     );
}
 
export default Members;