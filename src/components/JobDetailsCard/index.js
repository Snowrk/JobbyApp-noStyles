import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import SimilarJobCard from '../SimilarJobCard'

const compStatus = {
  inProgess: 'LOADING',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class JobDetailsCard extends Component {
  state = {status: compStatus.inProgess, details: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {status} = this.state
    if (status !== compStatus.inProgess) {
      this.setState({status: compStatus.inProgess})
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const similarJobs = data.similar_jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))
      const formattedData = {jobDetails, similarJobs}
      this.setState({details: formattedData, status: compStatus.success})
    } else {
      this.setState({status: compStatus.failed})
    }
  }

  renderSOrF = () => {
    const {status} = this.state
    return status === compStatus.success ? (
      this.renderSuccess()
    ) : (
      <FailedView func={this.getData} />
    )
  }

  renderSuccess = () => {
    const {details} = this.state
    const {jobDetails, similarJobs} = details
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      location,
      rating,
      employmentType,
      packagePerAnnum,
      jobDescription,
      lifeAtCompany,
      skills,
    } = jobDetails
    return (
      <>
        <div>
          <div>
            <img src={companyLogoUrl} alt="job details company logo" />
            <div>
              <h1>{title}</h1>
              <div>
                <BsStarFill />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <MdLocationOn />
              <p>{location}</p>
            </div>
            <div>
              <BsBriefcaseFill />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              Visit
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul>
            {skills.map(item => (
              <li key={item.name}>
                <img src={item.image_url} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobs.map(item => (
            <SimilarJobCard itemDetails={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {status} = this.state
    return (
      <>
        <Header />
        <div>
          {status === compStatus.inProgess ? (
            <LoadingView />
          ) : (
            this.renderSOrF()
          )}
        </div>
      </>
    )
  }
}

export default JobDetailsCard
