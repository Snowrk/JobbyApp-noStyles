const SalaryRangeRadio = props => {
  const {itemDetails, func, checked} = props
  const {salaryRangeId, label} = itemDetails
  const inpChange = () => func(salaryRangeId)
  return (
    <li>
      <input
        id={salaryRangeId}
        name="salaryRangeRadio"
        type="radio"
        checked={checked}
        value={salaryRangeId}
        onChange={inpChange}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRangeRadio
