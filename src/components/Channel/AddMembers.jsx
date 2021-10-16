import React from 'react';
import { getToken } from '../../Utils/common';
import {useState, useEffect } from 'react';
import Select from 'react-select';
import './Channel.css'
import { getDatabase, ref, push } from "firebase/database";
import { FetchUsers, AddMemberToChannel } from '../../Utils/Api';

function AddMembers(props){
  const db = getDatabase();
  const [member, setMember] = useState(null);
  const [userList, setUserList] = useState([]);
  const [notice, setNotice] = useState(null);
  const [noticeColor, setNoticeColor] = useState(null);
  
  const data = {
    "id": props.channel_id,
    "member_id": member
  }
  const memberChange = (e) => {
    setMember(e.value)
  }
  
  const add = (e) => {
    e.preventDefault()
    AddMemberToChannel(data, getToken())
      .then(res => {
        if(res['data']['data'] === undefined){
          setNotice(JSON.stringify(res['data']['errors'][0]))
          setNoticeColor({color: 'red'})
        }else{
          setNotice('Member was added successfully!')
          setNoticeColor({color: 'green'})
        }
        push(ref(db, '/member/'+props.channel_id),data);
      });
  }

  const fetchUserList = () => {
    FetchUsers(getToken())
      .then((res) => {
        setUserList(res['data']['data']);
      })
  }

  useEffect(() => {
      fetchUserList();
  }, []);
    
  const Options = [
      userList.map(({id, email}) => { return { value: id, label: email }})
  ]

    return (
      <div className="addMemberContainer">
          <span style={noticeColor}>{notice ? notice : null}</span>
          <Select name="colors" options={Options[0]} className="basic-multi-select user-select" classNamePrefix="select" onChange={memberChange}/>
          <button onClick={add} className='addUserBtn'>Add User</button>
      </div>
   );
}

export default AddMembers;