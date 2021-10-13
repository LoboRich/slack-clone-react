import axios from "axios";
import { getToken } from "../Utils/common";
import {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";

function Search(props){
    const history = useHistory();
    const [userList, setUserList] = useState([]);
    const [userIds, setUserIds] = useState(props['user_id'])
    
    const fetchUserList = () => {
        axios.get("http://206.189.91.54//api/v1/users", {
            headers: getToken()
        }).then((res) => {
            setUserList(res['data']['data']);
        })
    }
    
    useEffect(() => {
        fetchUserList();
    }, [props]);

    const newDM = (user_id) => {
        history.push('/users/User/'+user_id)
    }


    return (
        userList.filter(person => userIds.includes(person.id)).map(filteredPerson => (
            <h4 key={filteredPerson.id} onClick={() => newDM(filteredPerson.id)} user_id={filteredPerson.id} className='channelsMembers'> {filteredPerson.email}</h4>
        ))
    )
    
}

export default Search;