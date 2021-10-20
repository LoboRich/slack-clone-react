import './Header.css'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { getToken } from '../../Utils/common';
import {useState, useEffect, useRef } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
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
    const db = getDatabase();
    const history = useHistory();
    const [userList, setUserList] = useState([]);
    const [userModal, setuserModal] = useState(false)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setuserModal);

    const list = () => {
      FetchUsers(getToken())
        .then(res => {
          setUserList(res['data']['data']);
        }).catch(err => err)
    }

    useEffect(() => {
      list();
      const new_user = ref(db, '/new_user');
        onValue(new_user, (snapshot) => {
          const new_user = snapshot.val(); 
          list();
      });
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
      <button className='navBtn'>Hey</button>
      <div className="header__left">
        <AccessTimeIcon />
      </div>
      <div className="header__middle">
        <Select id="user_select" name="users" onChange={select_user} options={Options[0]} className="basic-multi-select user-select" classNamePrefix="Search" placeholder="Search User"/>
      </div>
      <div className="header__right">
        <HelpOutlineIcon />
      </div> 
      <img src={man} alt="" className="header__avatar" onClick={()=>setuserModal(true)}/>
      {userModal && <div className="userInfoModal" ref={wrapperRef}><User modalInt={setuserModal}/></div>}
    </div>
  )

}
export default Header;