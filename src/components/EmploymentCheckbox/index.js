const EmployemntCheckbox = props => {
  const {itemDetails, func, checked} = props
  const {employmentTypeId, label} = itemDetails
  const inpChange = () => func(employmentTypeId)
  return (
    <li>
      <input
        id={employmentTypeId}
        name="employemntCheckbox"
        type="checkbox"
        checked={checked}
        value={employmentTypeId}
        onChange={inpChange}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmployemntCheckbox
