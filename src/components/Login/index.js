import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  updateUsername = event => this.setState({username: event.target.value})

  updatePassword = event => this.setState({password: event.target.value})

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})
      console.log(Cookies.get('jwt_token'))
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    console.log(token)
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.onLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label htmlFor="us">USERNAME</label>
          <br />
          <input
            id="us"
            type="text"
            placeholder="Username"
            value={username}
            onChange={this.updateUsername}
          />
          <br />
          <label htmlFor="pass">PASSWORD</label>
          <br />
          <input
            id="pass"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.updatePassword}
          />
          <br />
          <button type="submit">Login</button>
          {errMsg.length > 0 ? <p>{errMsg}</p> : null}
        </form>
      </div>
    )
  }
}

export default Login
