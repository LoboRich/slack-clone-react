import { getToken } from '../../Utils/common';
import {useState, useEffect} from 'react';
import {FetchOwnedChannels} from '../../Utils/Api'

const OwnedChannels = () => {
    const [ownedChannels, setOwnedChannels] = useState([]);
    const [hasError, setErrors] = useState(false);

    useEffect(() => {
        FetchOwnedChannels(getToken())
            .then(res => {
                setOwnedChannels(res['data']['data'])
            }).catch(error => {
                setErrors(error)
            })
    }, []);
  
    return (
        <div className="ownedContainer">
                {hasError ? <p>{hasError.message}</p> : null}
                {ownedChannels.map(ownedChannel => {
                    const {id, name} = ownedChannel;
            return (
                <div className="ownedSlides">
                    <a href={'/channel-details/Channel/'+id} key={id}>{name}</a>
                </div>
                
            );
        })}
        </div>
    )
}
export default OwnedChannels;