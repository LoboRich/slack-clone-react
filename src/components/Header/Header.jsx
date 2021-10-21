import './Header.css'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { getToken } from '../../Utils/common';
import {useState, useEffect, useRef } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import {FetchUserDms, FetchUserChannels } from '../../Utils/Api'
import User from './User';
import man from '../resources/man.png'
import lock from '../resources/lock.png'
import avatar from '../resources/avatar.png'

function useOutsideAlerter(ref, setuserModal) {
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setuserModal(false)
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

function Header() {
  const db = getDatabase();
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const [channels, setChannels] = useState([])
  const [userModal, setuserModal] = useState(false)
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setuserModal);

  const getDirectMessages = () => {
    FetchUserDms(getToken())
      .then(res => {
        if(res['data']['data'] === undefined){
            return
        }else{
          setUserList(res['data']['data'])
        }
      })
  }

  const getChannels = () => {
    FetchUserChannels(getToken())
      .then(res => {
          if(res['data']['data'] === undefined){
              return
          }else{
              setChannels(res['data']['data'])
          }
      })
  }

  const Options = [
    userList.map(list => {
        const {id, email} = list;
        return {
          value: `/users/User/${id}`,
          label: <div className='search_output_container'>
            <img src={avatar} className='search_img'/>
            {email}
          </div> 
        };
    }),
    
  ]
  const Options1 = [
    channels.map(c => {
      const {id, name} = c;
      return {
        value: `/channel-details/Channel/${id}`,
        label: <div className='search_output_container'>
          <img src={lock} className='search_img'/>
          {name}
          </div> 
        };
    })
  ]

  useEffect(() => {
    getChannels();
    getDirectMessages();
    const channel = ref(db, `/channel`);
    onValue(channel, (snapshot) => {
        const channel = snapshot.val();
        getChannels();
    });

    const dm = ref(db, `/chats/User`);
    onValue(dm, (snapshot) => {
        const dm = snapshot.val();
        getDirectMessages();
    });
  }, []);

  const select_user = (e) => {
    history.push(e.value)
  }

  return (
    <div className="header">
      <div className="header__left">
        <AccessTimeIcon />
      </div>
      <div className="header__middle">
        <Select id="user_select" name="users" onChange={select_user} options={[...Options[0], ...Options1[0]]} className="basic-multi-select user-select" classNamePrefix="Search" placeholder="Search User/Channel"/>
      </div>
      <div className="header__right">
        <HelpOutlineIcon />
        <img src={man} alt="" className="header__avatar" onClick={()=>setuserModal(true)}/>
      </div> 
      {userModal && <div className="userInfoModal" ref={wrapperRef}><User modalInt={setuserModal}/></div>}
    </div>
  )

}
export default Header;