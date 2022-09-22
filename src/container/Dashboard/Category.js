import MissionCard from 'components/MissionCard'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMsg from 'components/ErrorMsg'
import {fetchMissions, deleteMission ,updateMission} from 'store'
import useCategory from 'hooks/useCategory'
import { Outlet } from 'react-router-dom'
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.5
        }
    }
}

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}
const Category = (props) => {
    const { loading, error, filteredData } = useSelector(state => state.missions)
    
    const {uid}=useSelector(state=>state.auth.user)
    const [showModal, setShowModal] = useState(true)

     const missionCat=useCategory()
    const dispatch = useDispatch()

   

    useEffect(() => {
       
        if (!uid) return
        let cat=missionCat;
        !cat?cat='all':cat=cat.name
        dispatch(fetchMissions(uid, cat))
        // console.log(`fetch  missions for user id ${uid} and category: ${cat}`);
    }, [uid,missionCat,dispatch])


    //delete mission
    const delBtnClickHanlder=(id)=>{
        if(!id) return
        dispatch(deleteMission(id))
    }

    //make mission complete
    const markMissionCompleteHanlder=(value,id)=>{
        dispatch(updateMission({
            isCompleted:value
        },id))
    }
    if (loading) {
        return (<div className="text-center my-3">
            <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>)
    }
    if (error) {
        return <ErrorMsg msg={error} />
    }
    return (
        filteredData!==null && ( <>
            <LazyMotion features={domAnimation}>
                <hr />
                {missionCat !== undefined && (
                     <div className="my-2 d-flex align-items-center justify-content-between mx-4">
                      <div className='d-flex align-items-center'>
                         <span className={`text-${missionCat.badge} fs-2 mx-3 text-uppercase` }>{missionCat.name}</span>
                          <span className={`span-box bg-${missionCat.badge}`}
                          
                          ></span>                        
                        </div>  
                     <div>
                     <button title='deleteCategory' className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCategoryModal">
                         <i className="fa fa-trash"></i>
                     </button>
                     </div>
                    
                 </div>
                )}
               
                <m.div className="row align-items-start g-3"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {filteredData.length === 0 && !loading ? <p className='my-2 fs-3 lead px-2'>No Missions added yet! so lazy han!</p>
                        : filteredData.map(mission => (
                            <m.div className='col-sm-6    col-md-4 ' key={mission.id}
                                variants={item}
                            >
                                <MissionCard
                                    mission={mission}
                                    deleteMissionClicked={delBtnClickHanlder}
                                    onMarkComplete={(val)=>markMissionCompleteHanlder(val,mission.id)}
                                    editClicked={setShowModal}
                                />
                            </m.div>
                        ))
                    }
                </m.div>
            </LazyMotion>

            <Outlet
                context={{
                    showModal,
                    setShowModal
                }}
            />
        </>)

       
    )
}


export default Category