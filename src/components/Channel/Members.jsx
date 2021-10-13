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
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);

    useEffect(() => {
        axios.get("http://206.189.91.54//api/v1/channels/"+props.details.id, {
            headers: getToken()
        }).then((res) => {
            setDetails(res['data']['data']);
            setLoading(false);
        }).catch(error => {
            setErrors(error)
            setLoading(true)
        })
    },[props]);

    const newDM = (user_id) => {
        history.push('/users/User/'+user_id)
    }

    return ( 
        <div className="membersContainer">
            {/* Add Members to Channel */}
            {/* List of Members */}
            <button onClick={()=>props.exitModal(false)}>X</button>
            <div className="membersForm">
                <div className="memberNow">
                {
                //     !isLoading ? (
                //         details['channel_members'].map(detail => {
                //             const {user_id} = detail;
                //             return (
                //                     <h4 className='membersLink' onClick={() => newDM(user_id)} user_id={user_id} ><Search user_id={user_id}/></h4>
                //             );
                //         })
                //     ): (
                //     <p>{isLoading}</p>
                //     ) 
                    <Search user_id={details['channel_members'].map(detail => detail.user_id)}/>
                }
                </div>
                <AddMembers channel_id={props.details.id} />
            </div>
        </div>
     );
}
 
export default Members;