import React from 'react'
import svg from "assets/404.svg"
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='container-fluid text-center'>
        <div className="svg-wrapper">
            <img src={svg} alt="mission-cube-404-page" />
        </div>
        <div className="text-center">
            <Link to='/' className='btn btn-primary btn-lg my-2' >Go Home</Link>
        </div>
    </div>
  )
}

export default NotFound