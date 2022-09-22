import React from 'react'

const ErrorMsg = ({msg}) => {
  return (
    <div className="alert alert-danger" role="alert">
    <h2 className='text-danger'>
    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
        </h2>    
    <h4 className="alert-heading">Aww, snap!</h4>
    <p>{msg}</p>
    <hr/>
    <p className="mb-0">Try again, Make sure you have internet connection!</p>
  </div>
  )
}

export default ErrorMsg