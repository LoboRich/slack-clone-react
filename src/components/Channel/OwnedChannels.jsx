import axios from 'axios';
import { getToken } from '../../Utils/common';
import {useState, useEffect} from 'react';

const OwnedList = () => {
    const [ownedChannels, setOwnedChannels] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);


    const fetchOwnedChannels = () => {
        axios.get("http://206.189.91.54//api/v1/channel/owned", {
            headers: getToken()
        }).then((res) => {
            setOwnedChannels(res['data']['data']);
            setLoading(false);
        }).catch(error => {
            setErrors(error)
            setLoading(true)
        })
    }

    useEffect(() => {
        fetchOwnedChannels();
    }, [ownedChannels.length]);
  
    return <div>
        <h1>Channel List</h1>
        {hasError ? <p>{hasError.message}</p> : null}
        {!isLoading ? (
            ownedChannels.map(ownedChannel => {
                const {id, name} = ownedChannel;
                return (
                    <div key={id}>
                        <p>Name: {name}</p>
                    </div>
                );
            })
        ): (
        <p>{isLoading}</p>
        )}
    </div>

}
function OwnedUserChannels(){
    return (
        <div>
            <OwnedList />
        </div>
    )
}
export default OwnedUserChannels;