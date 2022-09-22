import React from 'react'
import Button from 'components/ui/Button'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'



const MissionCard = ({mission,deleteMissionClicked,onMarkComplete,editClicked}) => {
    const [markComplete,setMarkComplete]=useState(mission.isCompleted)
    const handleInputChange=({target})=>{
        setMarkComplete(target.checked)
        onMarkComplete(target.checked)
    }

    return (
            <motion.div className={`card border-0 ${mission.isCompleted && 'completed-mission'} border-top border-${mission.badge} border-4 rounded shadow-lg`}
            transition={{
                duration:0.5
            }}
            whileHover={{
                y:-10,
                shadow:'0px 4px 5px #e4e4e4',
            }}
            >
                <div className="card-header border-0 ">
                    <h5 className="px-3">{mission.category}</h5>
                </div>
                <div className="card-body py-1 px-2 ">
                    <p className="fs-4 lead">
                        {mission.content}
                    </p>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="form-check form-switch" title='mark mission as completed'>
                        <input
                        disabled={mission.isCompleted}
                        readOnly={mission.isCompleted}
                        value={markComplete}
                        onChange={handleInputChange}
                        className="form-check-input green-box" type="checkbox" role="switch" id="completeButton" />
                        <label
                         className="form-check-label" htmlFor="completeButton">
                            {mission.isCompleted?'Completed':'Complete'}
                        </label>
                    </div>

                    <div className="actions d-flex text-grey">
                        {!mission.isCompleted && 
                        (
                            <Link 
                            onClick={()=>editClicked(true)}
                            title='edit mission content' className='btn-sm text-primary  border-0 edit-btn bg-transparent' to={`/dashboard/${mission.category}/${mission.id}`}>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </Link>
                        )
                        }
                       
                        <Button type="sm del-btn    border-0 bg-transparent"
                        clicked={()=>deleteMissionClicked(mission.id)}
                        >
                            <i className="fa fa-trash" title='delete mission' aria-hidden="true"></i>
                        </Button>
                    </div>
                </div>
            </motion.div>
    )
}

export default MissionCard