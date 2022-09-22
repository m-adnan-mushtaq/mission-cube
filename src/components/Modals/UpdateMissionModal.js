import CreateMissionFields from 'components/CreateMissionFields'
import ErrorMsg from 'components/ErrorMsg'
import BackDrop from 'components/ui/Backdrop/Backdrop'
import Button from 'components/ui/Button'
import { memo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { updateMission ,fetchMissionById} from 'store'



const UpdateMissionModal = (props) => {
    const { fetchLoading: loading, fetchError: error, fetchData: data } = useSelector(state => state.missions)
    const navigate=useNavigate()
    const { data: categories } = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const { missionId } = useParams()
    const {showModal,setShowModal}=useOutletContext()
    // input value handler
    const content = useRef()
    const category = useRef()

    
    //find specifc mission
    useEffect(() => {
        if (!missionId) return
        dispatch(fetchMissionById(missionId))
    }, [missionId, dispatch])

    const updateMissionHanlder = (e) => {
        e.stopPropagation()
        if (!content || !category || !data.id) throw Error('Invalid Credentials!')
        let { badge } = categories.find(elm => elm.name === category.current.value)
        let credentials={
            content: content.current.value, 
            category: category.current.value, 
            badge,
        }
        dispatch(updateMission(credentials,data.id,navigate))
        setShowModal(false)
    }   
    return (

        (
            <>
                <BackDrop show={showModal} modalClosed={() =>setShowModal(false)}>
                    {loading ? (<div className="text-center my-4">
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>) : (
                        error && data === null ? <ErrorMsg msg={error} /> :
                            (<>
                                <CreateMissionFields
                                    content={content}
                                    category={category}
                                    contentVal={data?.content}
                                    categoryVal={data?.category?.name}
                                    data={categories}
                                />
                                <div className="text-center">
                                    <Button type="warning my-4" clicked={updateMissionHanlder} disabled={loading}
                                    >
                                        Update Content
                                    </Button>
                                </div>
                            </>)
                    )}
                </BackDrop>


            </>
        )


    )
}

export default memo(UpdateMissionModal)