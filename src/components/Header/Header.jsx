import './Header.css'
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { getToken } from '../../Utils/common';
import {useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import {FetchUsers} from '../../Utils/Api'

function Header() {
    const history = useHistory();
    const [userList, setUserList] = useState([]);

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
        <Avatar
          className="header__avatar"
        />
      </div> 
    </div>
  )

}
export default Header;