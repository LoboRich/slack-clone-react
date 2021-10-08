import axios from 'axios';
import { getToken } from '../../Utils/common';
import {useState, useEffect} from 'react';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);


    const fetchUserList = () => {
        axios.get("http://206.189.91.54//api/v1/users", {
            headers: getToken()
        }).then((res) => {
            setUserList(res['data']['data']);
            setLoading(false);
        }).catch(error => {
            setErrors(error)
            setLoading(true)
        })
    }

    useEffect(() => {
        fetchUserList();
    }, [userList, setUserList]);
  
    return <div className="userList">
        <h1>User List</h1>
        {hasError ? <p>{hasError.message}</p> : null}
        {!isLoading ? (
            userList.map(UserList => {
                const {id, email} = UserList;
                return (
                    <div key={id}>
                        <p>Name: {email}</p>
                    </div>
                );
            })
        ): (
        <p>{isLoading}</p>
        )}
    </div>

}
function GetUserList(){
    return (
        <UserList />
    )
}
export default GetUserList;