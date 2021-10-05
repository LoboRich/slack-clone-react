import React from 'react';
import axios from 'axios';

const AddMemberToChannel = ({ id, member_id, headers:{ token, client, expiry, uid } }) => {
    return axios.post(
      "http://206.189.91.54//api/v1/channel/add_member", 
    {
      id,
      member_id
    },
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      }
    })
    .then(response => response)
    .then(result => result)
    .catch(error => error)
  }
  
export default AddMemberToChannel;