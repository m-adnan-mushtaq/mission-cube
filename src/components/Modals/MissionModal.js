import Modal from "components/ui/Modal"
import Button from "components/ui/Button"
import { memo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addNewMission } from "store"
import CreateMissionFields from "components/CreateMissionFields"

const MissionModal = () => {
    const { categories: { data }, missions: { loading } ,auth:{user:{uid}}} = useSelector(state => state)
    const dispatch = useDispatch()
    const content = useRef()
    const category = useRef()
    const closeBtnRef=useRef()

    const clickHandler = () => {
        let contentVal = content.current.value
        let categoryVal = category.current.value
        if (!contentVal || !categoryVal || contentVal.trim().length < 5) {
            toast.warning('Fill all fields, Dear!')
            return
        }
        let { badge } = data.find(elm => elm.name === categoryVal)
        if(!uid || !badge){
            toast.warning('Invalid credentials, try  again!')
            return
        }
        dispatch(addNewMission({
            uid,
            badge,
            content:contentVal.trim(),
            category:categoryVal
        }))
        content.current.value=''
        closeBtnRef.current.click()
    }

    return (
        <Modal closeBtnRef={closeBtnRef} id="missionModal" modalTitle="Create New Mission" >
           <CreateMissionFields
                content={content}
                category={category}
                contentVal=''
                categoryVal=''
                data={data}
           />
            {data.length === 0 ? <p className="text-warning my-4"><i className="fa fa-exclamation-triangle me-2" aria-hidden="true"></i> Add new category first, for adding  mission</p> :
                <div className="text-center">
                    <Button type="primary my-4" clicked={clickHandler} disabled={loading}>
                        {
                            loading ? (<> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Creating...</>) : <span>Create Mission</span>
                        }
                    </Button>
                </div>
            }


        </Modal>
    )
}

export default memo(MissionModal)