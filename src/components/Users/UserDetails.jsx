import React, { useEffect, useState } from 'react'
import Search from '../Search';
import lock from '../resources/lock.png'
import axios from "axios";
import { getToken } from "../../Utils/common";
import { useHistory } from "react-router-dom";

function UserDetails(props) {
    const uid = JSON.parse(props.user_id)
    const [userList, setUserList] = useState([]);

    const history = useHistory();
    
    const fetchUserList = () => {
        axios.get("http://206.189.91.54//api/v1/users", {
            headers: getToken()
        }).then((res) => {
            setUserList(res['data']['data']);
        })
    }
    
    useEffect(() => {
        fetchUserList();
    }, [props]);

    return  (
        <div className='header-content'>
            <span className='channel-name'den="true"><img src={lock} alt="" srcset="" className='lockIcon' />
                {
                userList.filter(person => uid === person.id).map(filteredPerson => (
                    <h4 key={filteredPerson.id} user_id={filteredPerson.id} className='channelsMembers'> {filteredPerson.email}</h4>
                ))
                }
                
            </span>
        </div>
    )
}
export default UserDetails;