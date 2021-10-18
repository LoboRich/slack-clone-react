import React, { useEffect, useState } from 'react'
import lock from '../resources/lock.png'
import { getToken } from "../../Utils/common";
import {FetchUsers} from '../../Utils/Api'

function UserDetails(props) {
    const uid = JSON.parse(props.user_id)
    const [userList, setUserList] = useState([]);
    
    useEffect(() => {
        FetchUsers(getToken())
          .then(res => {
            setUserList(res['data']['data']);
          }).catch(err => err)
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