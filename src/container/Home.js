import React from 'react'
import logo from "assets/logo.svg"
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"

const container={
    hidden:{
        opacity:0,
        scale:1.1,
    },
    show:{
        opacity:1,
        scale:1
    },
    leave:{
        opacity:0,
        scale:1.5
    }
}
const buttonItem={
    hidden:{
        opacity:0,
        y:100,
    },
    show:{
        opacity:1,
        y:0
    },
    exit:{
        y:"100vh"
    }
}
const titleVariants={
    hidden:{
        opacity:0,
        y:-100
    },
    show:{
        opacity:1,
        y:0
    },
    exit:{}
}
const Home = () => {
    return (
        <motion.div
         variants={container}
         initial="hidden"
         animate="show"
         exit="leave"
         transition={{duration:0.8,type:"spring",stiffness:100,delayChildren:0.8}}
         className="container-fluid  pt-2 shadow d-flex justify-content-center align-items-center vh-100">
            <div className="jumbotron text-center">
                <div className="logo text-center my-2">
                <img src={logo} alt="Mission Cube React App" className='img-fluid' />
                </div>
            <motion.p className="fs-2 text-info"
            variants={titleVariants}
            transition={{duration:1}}
            >Be More Productive with managing your schedule with Mission Cube
            </motion.p>
            <hr className="my-4"/>
                <p className='lead'>Best React To Do Application with catagories wise tasks, Mission Cube is to do application made with react using firebase client sdk for managing authentication and database and all actions are performed by redux made by Adnan Malik.</p>
                <motion.div
                variants={buttonItem}
                transition={{
                    type:"tween",
                    duration:1
                }}
                >
                <Link className="btn btn-info rounded btn-lg px-4 m-2" to="/sign-up" role="button">Join Us</Link>
                <Link className="btn btn-success rounded btn-lg px-4 m-2" to="/dashboard" role="button">Dashboard</Link>
                </motion.div>
        </div>
        </motion.div>
        
    )
}

export default Home