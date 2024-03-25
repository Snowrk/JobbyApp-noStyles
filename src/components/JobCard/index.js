import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const JobCard = props => {
  const {itemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = itemDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
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
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
