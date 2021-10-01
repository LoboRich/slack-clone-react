import axios from "axios";
import { getToken } from "../../Utils/common";
import {useState} from 'react'
import { Button } from '@material-ui/core'
import './Channel.css'

const CreateChannel = () => {
    const [name, setName] = useState();
    const [userList, setUserList] = useState([]);

    const nameChange = (e) => {
        setName(e.target.value)
    }

    const userListChange = (e) => {
        console.log(e.target.value)
    }

    // const data = {
    //     "name": name,
    //     "user_ids": [53,54,142]
    // }

    const data = {
        "name": name,
        "user_ids": userList
    }


    const create = (e) => {
        e.preventDefault()
        axios.post('http://206.189.91.54//api/v1/channels', data, {
            headers: getToken()
        })
        .then((res) => {
            console.log(res['data'])
        });
    }

    return (
        <div>
            <h1> Add New Channel </h1>
            <form onSubmit={create} id='add-channel-form'>
                <input type='text' className='form-control' onChange={nameChange}/>
                <select onChange={userListChange} className='form-control'>
                    <option value="A">Apple</option>
                    <option value="B">Banana</option>
                    <option value="C">Cranberry</option>
                </select>
                <Button onClick={create} className='form-btn'>Add Channel</Button>
            </form>
        </div>
     );
}
 
export default CreateChannel;