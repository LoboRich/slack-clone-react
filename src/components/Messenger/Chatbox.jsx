import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState, useEffect } from 'react';
import AddMembers from "../Channel/AddMembers";
import './Chat.css'
import Search from "../Search";
import SendMessage from "./SendMessage";
import RetrieveMessage from "./RetrieveMessage";
import ChannelDetails from "../Channel/ChannelDetails";

const Chatbox = (props) => {
    const [details, setDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const channelDetails = (channel_id) => {
        axios.get("http://206.189.91.54//api/v1/channels/"+channel_id, {
            headers: getToken()
        }).then((res) => {
            setDetails(res['data']['data']);
            setLoading(false);
        }).catch(error => {
            setLoading(true)
        })
    }

    useEffect(() => {
        channelDetails(props.match.params.id);
    },[])

    return ( 
        <div className='chat-details'>
            <div className="chat-header">
               <ChannelDetails channel_id={props.match.params.id}/>
            </div>
            <div className="chat-body">
                <div className="chat-box">
                    <RetrieveMessage class={props.match.params.class} receiver_id={props.match.params.id} />
                </div>
                <div className="chat-input-box">
                   <SendMessage class={props.match.params.class} receiver_id={props.match.params.id}/>
                </div>
            </div>
            
        </div>
     );
}
 
export default Chatbox;
