import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'

class Header extends Component {
  state = {viewport: window.innerWidth}

  componentDidMount() {
    window.addEventListener('resize', this.handler)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handler)
  }

  handler = () => {
    console.log(window.innerWidth)
    this.setState({viewport: window.innerWidth})
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {viewport} = this.state
    return (
      <nav>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        {viewport < 768 ? (
          <ul>
            <Link to="/">
              <li aria-label="Home page">
                <IoMdHome />
              </li>
            </Link>
            <Link to="/jobs">
              <li aria-label="Jobs page">
                <BsBriefcaseFill />
              </li>
            </Link>
            <li>
              <button type="button" aria-label="logout" onClick={this.onLogout}>
                <IoIosLogOut />
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/jobs">
              <li>Jobs</li>
            </Link>
            <li>
              <button type="button" onClick={this.onLogout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
