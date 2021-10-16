import React from 'react';
import axios from 'axios';
import { getToken } from '../../Utils/common';
import {useState, useEffect } from 'react';
import Select from 'react-select';
import './Channel.css'
import { getDatabase, ref, push } from "firebase/database";

function AddMembers(props){
  const db = getDatabase();
  const [member, setMember] = useState(null);
  const [userList, setUserList] = useState([]);
  
  const data = {
    "id": props.channel_id,
    "member_id": member
  }
  const memberChange = (e) => {
    setMember(e.value)
  }
  
  const add = (e) => {
    e.preventDefault()
    axios.post('http://206.189.91.54//api/v1/channel/add_member', data, {
        headers: getToken()
    })
    .then((res) => {
        push(ref(db, '/member/'+props.channel_id),res['data']['data']);
    });
  }
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


    return (
      <div className="addMemberContainer">
            <Select name="colors" options={Options[0]} className="basic-multi-select user-select" classNamePrefix="select" onChange={memberChange}/>
            <button onClick={add} className='addUserBtn'>Add User</button>
      </div>
   );
}

export default AddMembers;