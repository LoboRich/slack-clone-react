import axios from "axios";
import { getToken } from "../../Utils/common";

const RetrieveMessage = () => {

    console.log(getToken())

    const retrieveData = (e) => {
        e.preventDefault()
        axios.post('http://206.189.91.54//api/v1/messages', {
        headers: {
            'access-token': 'RTBb921MmlWSowTnv3iOeQ',
            'client': 'vMVwmYqzIaiYd6SPs9ld9g',
            'expiry': 1634124199,
            'uid': 'test69@gmail.com'
        },
        data: {
            'receiver_id': 1,
            'receiver_class': 'User',
            'body': 'Whats up!'
        }
        }).then((res) => {
            console.log(res.data)
        });
    }

    return ( 
        <div className="retrieve-wrapper">
            <button onClick={retrieveData}>Button</button>
        </div>
     );
}
 
export default RetrieveMessage;