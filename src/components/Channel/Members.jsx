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
    },[props]);

    const newDM = (user_id) => {
        history.push('/users/User/'+user_id)
    }

    console.log(props.class)


    return ( 
        <div className="membersContainer">
            {/* Add Members to Channel */}
            {/* List of Members */}
            <div className="membersForm">
                {
                    !isLoading ? (
                        details['channel_members'].map(detail => {
                            const {user_id} = detail;
                            return (
                                <span onClick={() => newDM(user_id)} user_id={user_id} className='memberLink'><Search user_id={user_id}/></span>
                            );
                        })
                    ): (
                    <p>{isLoading}</p>
                    )
                }
                <AddMembers channel_id={props.channel_id} />
            </div>
        </div>
     );
}
 
export default Members;