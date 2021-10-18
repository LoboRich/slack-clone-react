import './Header.css'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { getToken } from '../../Utils/common';
import {useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import {FetchUsers} from '../../Utils/Api'
import User from './User';
import man from '../resources/man.png'

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
    const history = useHistory();
    const [userList, setUserList] = useState([]);
    const [userModal, setuserModal] = useState(false)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setuserModal);

    useEffect(() => {
      FetchUsers(getToken())
        .then(res => {
          setUserList(res['data']['data']);
        }).catch(err => err)
    }, []);

  const Options = [
    userList.map(list => {
        const {id, email} = list;
        return { value: id, label: email };
    })
  ]

  const select_user = (e) => {
    history.push('/users/User/'+e.value)
  }

  return (
    <div className="header">
      <div className="header__left">
        <AccessTimeIcon />
      </div>
      <div className="header__middle">
        <Select id="user_select" name="users" onChange={select_user} options={Options[0]} className="basic-multi-select user-select" classNamePrefix="Search" placeholder="Search User"/>
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