// import withEnsureAuth from 'components/HOC/withEnsureAuth'
import withEnsureAuth from 'components/HOC/withEnsureAuth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {  Navigate } from 'react-router-dom'
import { logOutHelper } from 'store'

 const SignOut = (props) => {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(logOutHelper())
    },[dispatch])
  return <Navigate to='/sign-in' replace />
}


export default withEnsureAuth(SignOut)

