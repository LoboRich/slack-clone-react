import SendMessage from "./SendMessage";
import './MessengerContainer.css'
import RetrieveMessage from "./RetrieveMessage";

const MessageContainer = () => {
    return ( 
    <div className="message-wrapper">
        <div className="message-box"></div>
        <div className="message-input">
            <SendMessage />
            <RetrieveMessage />
            <input type="text" />
        </div>
    </div> 
    );
}
 
export default MessageContainer;