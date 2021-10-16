import axios from "axios";
import { getToken, getUser } from "../../Utils/common";
import {useState, useEffect} from 'react'
import './Channel.css'
import logo from '../resources/slack-logo.png'
import Select from 'react-select';
import { getDatabase, ref, push } from "firebase/database";

const CreateChannel = () => {
    const db = getDatabase();
    const [name, setName] = useState();
    const [userIds, setuserIds] = useState([]);
    const [userList, setUserList] = useState([]);
    const [errors, setErrors] = useState(false);
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
            if(res['data']['errors'] != undefined){
                setErrors(res['data']['errors'])
            }else{
                setErrors(false)
                push(ref(db, `/channel/${getUser().id}`), res['data']['data']);
                setName('')
            }
            
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
                <span className="emCreateChannel">{ errors ? errors : null}</span>
                <form onSubmit={create} id='add-channel-form'>
                    <input value={name} type='text' className='form-control' onChange={nameChange}/>
                    <Select
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