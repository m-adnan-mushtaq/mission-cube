import {useRef} from 'react'
import { Link, Outlet} from 'react-router-dom'
import logo from "assets/logo.svg"
import { motion } from "framer-motion"
import CategoryModal from 'components/Modals/CategoryModal'
import MissionModal from 'components/Modals/MissionModal'
import ProfileModal from 'components/Modals/ProfileModal'
import Navbar from 'Navbar'
import CategoryList from 'components/Dashboard/CategoryList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'components/ui/Spinner'
import ErrorMsg from 'components/ErrorMsg'
import { findProfileData } from 'store'
import withEnsureAuth from 'components/HOC/withEnsureAuth'
import DeleteModal from 'components/Modals/DeleteModal'
import { useState } from 'react'
import * as actionCreator from "store/actionCreator"

//TODO: find logged user data and show it!

const Dashboard = (props) => {
    const {loading,error,data}=useSelector(state=>state.profile)
    const {uid}=props.user
    const dispatch=useDispatch()
    const [query,setQuery]=useState('')
    const sideBarRef=useRef()
    const toggleSidebar=(e)=>{
        sideBarRef.current.classList.toggle('active')
        e.target.classList.toggle('active')
    }
    
    useEffect(()=>{
        dispatch(findProfileData(uid))
    },[uid,dispatch])

    const queryInputChangeHanlder=({target:{value}})=>{
            setQuery(value)
            dispatch(actionCreator.filterMissions(value))
    }
    if(loading) return <Spinner/>
    if(error) return <ErrorMsg msg={error} />

    return (
        data!==null && <>
        <div className="dashboard-wrapper m-0">
            <nav id="sidebar" ref={sideBarRef}>
                <div id="sidebar-content">
                    <div className="sidebar-header">
                        <Link to='/' className='home-link'>
                            <img src={logo} alt="mission cube logo" />
                        </Link>
                    </div>

                    <p className="p-2 mb-0   fs-5  text-center">Catagories List</p>
                   <CategoryList/>

                    <div className="">
                        <div className="my-2 text-center">
                            <motion.button className="btn btn-primary shadow" data-bs-toggle="modal" data-bs-target="#missionModal"
                                whileHover={{ scale: 1.1}}
                                whileTap={{scale:0.9}}
                            >
                                <i className="fa fa-plus me-1 " aria-hidden="true"></i>
                                Add New Mission
                            </motion.button>

                        </div>
                        <div className="ms-2 mt-4">
                            <div className="dropup  ">
                                <button className=" avatar-btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img alt='user-avatar' referrerPolicy='no-referrer' loading='lazy' src={data.photoURL} />
                                </button>
                                <ul className="dropdown-menu shadow-lg rounded">
                                    <li><button className="dropdown-item" 
                                    data-bs-toggle="modal" data-bs-target="#profileModal"
                                    >View Profile</button>
                                    </li>
                                    <li><Link to='/logout' className="dropdown-item " >Log Out <i className="fa fa-sign-out ms-2"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>



                </div>
            </nav>

            <div id="content">
                <Navbar 
                toggleSidebar={toggleSidebar}
                query={query}
                handleChange={queryInputChangeHanlder}
                />
                <h1>Welcome {data.displayName} </h1>
                <Outlet 
                />
            </div>
        </div>


        <CategoryModal uid={uid}/>
        <MissionModal/>
        <ProfileModal user={data}   />
        <DeleteModal/>
        </>
        
    )
}

export default withEnsureAuth(Dashboard)