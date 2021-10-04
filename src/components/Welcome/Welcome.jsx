import './Welcome.css'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import fina from '../resources/fina.gif'
function Welcome() {
  const history = useHistory()

//   const addChannel = () => {
//     history.push('/add/channel')
//   }

  return (
    <div className="Welcome">
      <div className="Welcome__container">
      <img className='slack-gif' src={fina} alt="" srcset="" />
        <h1>Welcome to Slack!</h1>
        <p>
          Slack brings all your team communication into one place, makes it all
          instantly searchable and available wherever you go.
        </p>

        <p>
          Our aim is to make your working life simpler, more pleasant and more
          productive.
        </p>

        {/* <Button onClick={addChannel}>Create Channel</Button> */}
      </div>
    </div>
  )
}

export default Welcome