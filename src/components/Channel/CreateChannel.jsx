import axios from "axios";
import { getToken } from "../../Utils/common";
import {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import './Channel.css'
import logo from '../resources/slack-logo.png'
import Select from 'react-select';

const CreateChannel = () => {
    const [name, setName] = useState();
    const [userIds, setuserIds] = useState([]);
    const [userList, setUserList] = useState([]);
    const history = useHistory();
    const nameChange = (e) => {
        setName(e.target.value)
    }

    const userListChange = (e) => {
        setuserIds(e.map(x => {return x.value}))
    }

    const data = {
        "name": name,
        "user_ids": userIds
    }


    const create = (e) => {
        e.preventDefault()
        axios.post('http://206.189.91.54//api/v1/channels', data, {
            headers: getToken()
        })
        .then((res) => {
            alert('New channel has been successfully created');
        });
    }

    const fetchUserList = () => {
        axios.get("http://206.189.91.54//api/v1/users", {
            headers: getToken()
        }).then((res) => {
            setUserList(res['data']['data']);
        })
    }

    useEffect(() => {
        fetchUserList();
    }, []);
    
    const Options = [
        userList.map(list => {
            const {id, email} = list;
            return { value: id, label: email };
        })
    ]

    return (
        <div className="create-channel-container">
            <div className='create-channel'>
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Add New Channel </h1>
                <form onSubmit={create} id='add-channel-form'>
                    <input type='text' className='form-control' onChange={nameChange}/>
                    <Select
                        // defaultValue={[colourOptions[2], colourOptions[3]]}
                        isMulti
                        name="colors"
                        options={Options[0]}
                        className="basic-multi-select user-select"
                        classNamePrefix="select"
                        onChange={userListChange}
                    />
                    <button onClick={create} className='form-btn'>Create Channel</button>
                </form>
                
            </div>
        </div>
     );
}
 
export default CreateChannel;