import React from 'react'
import useValidation from 'hooks/useValidation'
import { Link } from 'react-router-dom'
import { giveValidClass } from 'utils/util'
import SocialButtons from 'components/Auth/SocialButtons'
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { singInHelper } from 'store/index'
import withRedirectAuth from 'components/HOC/withRedirectAuth'

const container={
    hidden:{
        opacity:0,
        y:"100vh",
    },
    show:{
        opacity:1,
        y:0
    },
    leave:{
        opacity:0,
        y:"-100vh"
    }
}

const Singin = () => {
    //utils hooks
    const dispatch=useDispatch()
    //local hooks
    const [email, isEmailValid, onEmailChange] = useValidation()
    const [password, isPasswordValid, onPasswordChange] = useValidation()

    const clickHanlder=(e)=>{
        e.preventDefault()
        if(!isEmailValid || !isPasswordValid){
            toast.warning('Make sure to fill all input fields!')
            return
        } 
        dispatch(singInHelper({email,password}))
    }
    return (
        <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        exit="leave"
        transition={{type:"tween",duration:0.4}}
        className='auth-wrapper my-3 mx-auto bg-secondary shadow rounded p-4'>
            <h5 className="fw-bold text-center my-3">
                <i className="fa fa-comment-o me-2 "></i>
                Welcome Back!
                </h5>
            <form action=''>
                <div className="form-floating mb-3">
                    <input placeholder="name@example.com" name='email' type="email" value={email} onChange={onEmailChange} className={`form-control ${giveValidClass(isEmailValid)}`} id="emailInput" required title='Enter a valid email address' />
                    <label htmlFor="emailInput">Email address</label>
                    <div className="invalid-feedback">Please enter a valid email address [a-zA-Z]</div>
                </div>
                <div className="form-floating mb-3">
                    <input autoComplete="true" name='password' type="password" placeholder="strong password?*" value={password} onChange={onPasswordChange} className={`form-control ${giveValidClass(isPasswordValid)}`} id="passwordInput" required title='Password should be 6 charactes long' />
                    <label htmlFor="passwordInput">Password</label>
                    <div className="invalid-feedback">Passowrd should be 6 characters long</div>
                </div>
                <p className="text-info fs-6 text-center">No account yet? <Link to='/sign-up' className="text-decoration-none link link-info">Sign Up</Link></p>
                <div className="text-center">
                    <button onClick={clickHanlder} 
                    className={`btn btn-primary w-50 ${(!isEmailValid || !isPasswordValid) && 'disabled'}`}
                    >Sign in
                    </button>
                </div>
            </form>
            <SocialButtons/>
        </motion.div>
    )
}


export default   withRedirectAuth(Singin)