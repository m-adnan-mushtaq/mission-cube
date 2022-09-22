import React from 'react'

const Option = ({value,label}) => {
    return (
        <option value={value} className={`bg-${value} fs-5 py-3  color-box`} >
            {label}
        </option>
    )
}

export default Option