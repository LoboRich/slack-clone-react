import axios from "axios";
import { getToken } from "../../Utils/common";
import {useState} from 'react'
import './Channel.css'
import logo from '../resources/slack-logo.png'

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
        <div className="create-channel-container">
            <div className='create-channel'>
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Add New Channel </h1>
                <form onSubmit={create} id='add-channel-form'>
                    <input type='text' className='form-control' onChange={nameChange}/>
                    <select onChange={userListChange} className='form-control'>
                        <option value="A">Apple</option>
                        <option value="B">Banana</option>
                        <option value="C">Cranberry</option>
                    </select>
                    <button onClick={create} className='form-btn'>Create Channel</button>
                </form>
            </div>
        </div>
     );
}
 
export default CreateChannel;