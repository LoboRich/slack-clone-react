import React from 'react';
import axios from 'axios';
import { getToken } from '../../Utils/common';
import {useState, useEffect } from 'react';
import Select from 'react-select';

const AddMembers = () => {
  const [userList, setUserList] = useState([]);
  const [member_id, setMember_id] = useState([]);
  const data = {
    "id": 3,
    "member_id": 3
  }
  const userListChange = (e) => {
    setMember_id(e.map(x => {return x.value}))
    
}
  const add = (e) => {
    e.preventDefault()
    axios.post('http://206.189.91.54//api/v1/channel/add_member', data, {
        headers: getToken()
    })
    .then((res) => {
        alert('Member Added Successfully');
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
      <div className="create-channel-container">
        <h1>Add Members</h1>
          {/* <div className='create-channel'>
                  <Select
                      // defaultValue={[colourOptions[2], colourOptions[3]]}
                      isMulti
                      name="colors"
                      options={Options[0]}
                      className="basic-multi-select user-select"
                      classNamePrefix="select"
                      onChange={userListChange}
                  />
          <button onClick={add} className='form-btn'>add members </button>
          </div> */}
      </div>
   );
}

export default AddMembers;