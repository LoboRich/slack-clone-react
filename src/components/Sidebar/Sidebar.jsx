
import axios from 'axios';
import { removeUserSession, getToken } from '../../Utils/common';
import './Sidebar.css'
import { useState, useEffect } from 'react'
import SidebarOption from './SidebarOption'
import CreateIcon from '@material-ui/icons/Create'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AddIcon from '@material-ui/icons/Add'
import { Link, useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core';

function Sidebar() {
  const [channels, setChannels] = useState([])
  const [dms, setDms] = useState([])

  const [isLoading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const history = useHistory()

  const getDirectMessages = () => {
    axios.get("http://206.189.91.54//api/v1/users/recent", {
      headers: getToken()
      }).then((res) => {
          if(res['data']['data'] === undefined){
              return
          }else{
            setDms(res['data']['data'])
          }
          setLoading(false);
          
      }).catch(error => {
          setErrors(error)
          setLoading(true)
      })
  }


  const getChannels = () => {
    axios.get("http://206.189.91.54//api/v1/channels", {
      headers: getToken()
      }).then((res) => {
          if(res['data']['data'] === undefined){
              return
          }else{
              setChannels(res['data']['data'])
          }
          setLoading(false);
          
      }).catch(error => {
          setErrors(error)
          setLoading(true)
      })
  }

  const logout = () => {
    removeUserSession();
    const data = sessionStorage.getItem('user')
    if (!data) {
      history.push('/Login')
    }
  }

  useEffect(() => {
    getChannels();
    getDirectMessages();
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>
            <Link to="/">Slack Clone</Link>
          </h2>
          <h3>
            <FiberManualRecordIcon />
            {/* {(user != null) ? user['data'].email.split('@')[0] : null} */}
          </h3>
        </div>
        <CreateIcon />
      </div>
      <div className="sidebar__options">
        <SidebarOption Icon={InsertCommentIcon} title="Thread" />
        <SidebarOption Icon={AlternateEmailIcon} title="Mentions & Reactions" />
        <SidebarOption Icon={MoreVertIcon} title="More" />
       
        <hr />
        <SidebarOption Icon={ArrowDropDownIcon} title="Channels" />
        <hr />
        {channels.map((channel) =>
          (
            <SidebarOption
              Icon={LockOutlinedIcon}
              title={channel.name}
              id={channel.id}
              key={channel.id}
              sub="sidebarOption__sub"
            />
          )
        )}

        <SidebarOption
          Icon={AddIcon}
          title="Add Channel"
          sub="sidebarOption__sub"
          addChannelOption
        />
        <hr />
        <SidebarOption Icon={ArrowDropDownIcon} title="Direct Messages" />
        <hr />
        {dms.map((dm) => (
          <SidebarOption
            Icon={FiberManualRecordIcon}
            title={dm.email.split('@')[0]}
            id={dm.id}
            key={dm.id}
            sub="sidebarOption__sub sidebarOption__color"
            user
            online='isOnline'
          />
        ))}
        <li>
          <Link to="/owned-channels">Owned Channels</Link>
        </li>
      </div>
       

        

      <button className="sidebar__logout" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Sidebar