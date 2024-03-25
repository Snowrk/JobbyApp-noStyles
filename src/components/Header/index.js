import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul>
        <Link to="/" className="mobile">
          <li aria-label="Home page">
            <IoMdHome />
          </li>
        </Link>
        <Link to="/jobs" className="mobile">
          <li aria-label="Jobs page">
            <BsBriefcaseFill />
          </li>
        </Link>
        <li className="mobile">
          <button type="button" aria-label="logout" onClick={onLogout}>
            <IoIosLogOut />
          </button>
        </li>
        <Link to="/" className="desktop">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="desktop">
          <li>Jobs</li>
        </Link>
        <span className="desktop">
          <li>
            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </li>
        </span>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
