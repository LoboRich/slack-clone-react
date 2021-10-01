import './Header.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


function Header() {
    const history = useHistory()
    const [user, setUser] = useState(null)

    return (
        <div className="header">
          <div className="header__left">
            {/* <AccessTimeIcon /> */}
          </div>
          <div className="header__middle">
            {/* <SearchIcon /> */}
            <input placeholder="Search tutorial-daltonic" />
          </div>
          {/* <div className="header__right">
            <HelpOutlineIcon />
            <Avatar
              className="header__avatar"
              src={user?.photoURL}
              alt={user?.displayName}
              onClick={moveToAcc}
            />
          </div> */}
        </div>
      )
    }
export default Header;