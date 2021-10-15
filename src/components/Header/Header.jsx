import './Header.css'
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import axios from 'axios';
import { getToken } from '../../Utils/common';
import {useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory } from "react-router-dom";


function Header() {
    const history = useHistory();
    const [userList, setUserList] = useState([]);

    const fetchUserList = () => {
      axios.get("http://206.189.91.54//api/v1/users", {
          headers: getToken()
      }).then((res) => {
          setUserList(res['data']['data']);
      })
    }
  
    useEffect(() => {
        fetchUserList();
    }, []);

    const Options = [
      userList.map(list => {
          const {id, email} = list;
          return { value: id, label: email };
      })
  ]

  const select_user = (e) => {
    document.getElementById('user_select')
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