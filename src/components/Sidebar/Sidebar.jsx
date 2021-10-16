
import { removeUserSession, getToken, getUser } from '../../Utils/common';
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
import { Button } from '@material-ui/core';
import { getDatabase, ref, onValue } from "firebase/database";
import {FetchUserChannels, FetchUserDms} from '../../Utils/Api'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


function Sidebar() {
  const db = getDatabase();
  const [channels, setChannels] = useState([])
  const [dms, setDms] = useState([])
  const [dropdown, setDropDown] = useState(true)
  const [dropdownCH, setDropDownCH] = useState(true)
  const [isLoading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const history = useHistory()

  const getDirectMessages = () => {
    FetchUserDms(getToken())
      .then(res => {
        if(res['data']['data'] === undefined){
            return
        }else{
          setDms(res['data']['data'])
        }
      }).catch(error => {
          setErrors(error)
          setLoading(true)
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
  
  const dmDropDown = () => {
    setDropDown(!dropdown)
  }

  const chDropDown = () => {
    setDropDownCH(!dropdownCH)
  }

  useEffect(() => {
    getChannels();
    getDirectMessages();
    const channel = ref(db, `/channel/${getUser().id}`);
    onValue(channel, (snapshot) => {
        const channel = snapshot.val();
        getChannels();
    });
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Slack Clone</h2>
        </div>
        <CreateIcon />
      </div>
      <div className="sidebar__options">
        <SidebarOption Icon={InsertCommentIcon} title="Thread" />
        <SidebarOption Icon={AlternateEmailIcon} title="Mentions & Reactions" />
        <SidebarOption Icon={MoreVertIcon} title="More" />
       
        <hr />
        <Button onClick={chDropDown} id = "ch"> {dropdownCH ? <ArrowDropDownIcon /> : <ArrowRightIcon /> } Channels </Button>
        <hr />

        {dropdownCH ? channels.map((channel) =>
          (
            <SidebarOption
              Icon={LockOutlinedIcon}
              title={channel.name}
              id={channel.id}
              key={channel.id}
              sub="sidebarOption__sub"
            />
          )
        ): <></>}

        <SidebarOption
          Icon={AddIcon}
          title="Add Channel"
          sub="sidebarOption__sub"
          addChannelOption
        />
        <hr />
        <Button onClick={dmDropDown} id="dm"> {dropdown ? <ArrowDropDownIcon /> : <ArrowRightIcon /> } Direct Messages</Button>
        <hr />
        {dropdown ? dms.map((dm) => (
          <SidebarOption
            Icon={FiberManualRecordIcon}
            title={dm.email.split('@')[0]}
            id={dm.id}
            key={dm.id}
            sub="sidebarOption__sub sidebarOption__color"
            user
            online='isOnline'
          />
        )): <></>}
      
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