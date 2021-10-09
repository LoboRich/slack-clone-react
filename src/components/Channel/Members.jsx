import AddMembers from './AddMembers';
import './Channel.css'


const Members = (props) => {
    return ( 
        <div className="membersContainer">
            {/* Add Members to Channel */}
            {/* List of Members */}
            <div className="membersForm">
                <AddMembers channel_id={props.channel_id} />
            </div>
        </div>
     );
}
 
export default Members;