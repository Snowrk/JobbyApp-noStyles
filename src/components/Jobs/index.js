import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import ProfileCard from '../ProfileCard'
import EmploymentCheckbox from '../EmploymentCheckbox'
import SalaryRangeRadio from '../SalaryRangeRadio'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const compStatus = {
  inProgess: 'LOADING',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    searchInp: '',
    employmentFilter: [],
    salaryRangeFilter: '',
    jobsList: [],
    status: compStatus.inProgess,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {status} = this.state
    if (status !== compStatus.inProgess) {
      this.setState({status: compStatus.inProgess})
    }
    const {employmentFilter, salaryRangeFilter, searchInp} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentFilter.join(
      ',',
    )}&minimum_package=${salaryRangeFilter}&search=${searchInp}`
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
      const formattedData = data.jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({jobsList: formattedData, status: compStatus.success})
    } else {
      this.setState({status: compStatus.failed})
    }
  }

  updateEmploymentTypeFilter = filterId => {
    this.setState(prevState => {
      const idx = prevState.employmentFilter.indexOf(filterId)
      if (idx !== -1) {
        const tempArr = [...prevState.employmentFilter]
        tempArr.splice(idx, 1)
        return {employmentFilter: tempArr}
      }
      return {employmentFilter: [...prevState.employmentFilter, filterId]}
    }, this.getData)
  }

  updateSalaryRangeFilter = filterId =>
    this.setState({salaryRangeFilter: filterId}, this.getData)

  updateSearchInp = event => this.setState({searchInp: event.target.value})

  renderSuccess = () => {
    const {jobsList} = this.state
    return jobsList.length > 0 ? (
      <ul>
        {jobsList.map(item => (
          <JobCard itemDetails={item} key={item.id} />
        ))}
      </ul>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderSOrF = () => {
    const {status} = this.state
    return status === compStatus.success ? (
      this.renderSuccess()
    ) : (
      <FailedView func={this.getData} />
    )
  }

  render() {
    const {status, employmentFilter, salaryRangeFilter, searchInp} = this.state
    return (
      <>
        <Header />
        <div>
          <div>
            <ProfileCard />
            <hr />
            <ul>
              {employmentTypesList.map(item => (
                <EmploymentCheckbox
                  itemDetails={item}
                  checked={employmentFilter.includes(item.employmentTypeId)}
                  key={item.employmentTypeId}
                  func={this.updateEmploymentTypeFilter}
                />
              ))}
            </ul>
            <hr />
            <ul>
              {salaryRangesList.map(item => (
                <SalaryRangeRadio
                  itemDetails={item}
                  checked={salaryRangeFilter === item.salaryRangeId}
                  key={item.salaryRangeId}
                  func={this.updateSalaryRangeFilter}
                />
              ))}
            </ul>
          </div>
          <div>
            <div>
              <input
                type="search"
                onChange={this.updateSearchInp}
                placeholder="Search"
                value={searchInp}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getData}
                aria-label="search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {status === compStatus.inProgess ? (
              <LoadingView />
            ) : (
              this.renderSOrF()
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
