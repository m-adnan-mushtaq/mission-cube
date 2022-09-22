import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import useCategory from 'hooks/useCategory'
import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCategory } from 'store'

const DeleteModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { uid } = useSelector(state => state.auth.user)
    const { loading } = useSelector(state => state.categories)
    const missionCat = useCategory()
    const closeBtnRef=useRef()
    const deleteHandler = () => {

        dispatch(deleteCategory(
            {
                uid,
                category: missionCat.name,
                id: missionCat.id
            }, navigate))
         closeBtnRef.current.click()   
    }
    return (
        <Modal closeBtnRef={closeBtnRef}  id="deleteCategoryModal" modalTitle='Delete Category' >
            <div className="p-2">
                <p className="fs-4">Are you sure, You want to delete category?</p>
                <p className="fs-6 text-warning">
                    All Missions Related this category will be deleted permanenty! This is one way action!
                </p>
            </div>
            <div className="clearfix">
                <div className="float-end">
                    <Button disabled={loading} type='light m-2' addons={{ "data-bs-dismiss": "modal", "aria-label": "Close" }}>
                        Cancel
                    </Button>
                    <Button type='danger m-2' clicked={deleteHandler} disabled={loading}>
                        {
                            loading ? (<> <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                Deleting...</>) : 'Delete'
                        }
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal