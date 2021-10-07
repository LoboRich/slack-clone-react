import './Header.css'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


function Header() {
    // const history = useHistory()
    // const [user, setUser] = useState(null)

    return (
      <div className="header">
        <div className="header__left">
          <AccessTimeIcon />
        </div>
        <div className="header__middle">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <div className="header__right">
          <HelpOutlineIcon />
          <Avatar
            className="header__avatar"
          />
        </div> 
      </div>
    )

    }
export default Header;