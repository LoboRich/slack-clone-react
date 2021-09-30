import SendMessage from "./SendMessage";
import './MessengerContainer.css'

const MessageContainer = () => {
    return ( 
    <div className="message-wrapper">
        <div className="message-box"></div>
        <div className="message-input">
            <SendMessage />
            <input type="text" />
        </div>
    </div> 
    );
}
 
export default MessageContainer;