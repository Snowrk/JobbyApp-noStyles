import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'

const compStatus = {
  inProgess: 'LOADING',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class ProfileCard extends Component {
  state = {status: compStatus.inProgess, profileDetails: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {status} = this.state
    if (status !== compStatus.inProgess) {
      this.setState({status: compStatus.inProgess})
    }
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileDetails: formattedData, status: compStatus.success})
    } else {
      this.setState({status: compStatus.failed})
    }
  }

  renderSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div>
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderSOrF = () => {
    const {status} = this.state
    return status === compStatus.success ? (
      this.renderSuccess()
    ) : (
      <div>
        <button type="button" onClick={this.getData}>
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {status} = this.state
    return status === compStatus.inProgess ? <LoadingView /> : this.renderSOrF()
  }
}

export default ProfileCard
