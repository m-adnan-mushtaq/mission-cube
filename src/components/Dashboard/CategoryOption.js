import React from 'react'
import PropTypes from "prop-types"
const CategoryOption = ({value}) => {
  return (
    <option value={value}>
        {value}
    </option>
  )
}

CategoryOption.propTypes={
    value:PropTypes.string.isRequired
}
export default CategoryOption