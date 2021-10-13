import React from 'react'
import Search from '../Search';
import lock from '../resources/lock.png'

function UserDetails(props) {
    
    return  (
        <div className='header-content'>
            <span className='channel-name'den="true"><img src={lock} alt="" srcset="" className='lockIcon' />
                <Search user_id={[JSON.parse(props.user_id)]}/>
            </span>
        </div>
    )
}
export default UserDetails;