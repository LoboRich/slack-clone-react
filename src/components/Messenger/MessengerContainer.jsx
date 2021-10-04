import SendMessage from "./SendMessage";
import './MessengerContainer.css'
import RetrieveMessage from "./RetrieveMessage";

const MessageContainer = () => {
    return ( 
    <div className="message-wrapper">
        <div className="message-box"></div>
        <div className="message-boxer">
            <input type="text" className='message-datas' />
        </div>
    </div> 
    );
}
 
export default MessageContainer;