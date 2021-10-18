import OwnedChannels from "../Channel/OwnedChannels";
import { removeUserSession } from '../../Utils/common';
import { useHistory } from 'react-router-dom'
import './Header.css'

const User = (props) => {
    const history = useHistory()

    const logout = () => {
        removeUserSession();
        const data = sessionStorage.getItem('user')
        if (!data) {
          history.push('/Login')
        }
      }

    return ( 
        <>
            <button className='canceModal' onClick={()=>props.modalInt(false)}>X</button>
            <h1 className='channelTitle'>Channels Created:</h1>
            <OwnedChannels />
            <button className="modalLogout" onClick={logout}>Logout</button>
        </>
     );
}
 
export default User;