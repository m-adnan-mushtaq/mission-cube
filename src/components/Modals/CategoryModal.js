import React, { memo, useRef } from "react";
import Modal from "components/ui/Modal";
import Option from "components/Dashboard/Option";
import Button from "components/ui/Button"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewCategory } from "store";
const options=[
  {value:'primary',label:'Primary'},
  {value:'secondary',label:'Secondary'},
  {value:'danger',label:'Highest'},
  {value:'warning',label:'Important'},
  {value:'success',label:'Least'},
]
const CategoryModal = ({uid}) => {
  const {loading}=useSelector(state=>state.categories)
  const dispatch=useDispatch()
  const name=useRef()
  const badge=useRef()
  const closeBtnRef=useRef()
  const clickHanlder=()=>{
     let nameVal=name.current.value
     let badgeVal=badge.current.value
     if(!nameVal.trim() || !badgeVal){
       toast.warning('Make sure, fill all inputs!')
       return
     }

     dispatch(addNewCategory({
      uid,name:nameVal.trim(),badge:badgeVal
     }))
     closeBtnRef.current.click()
  }
  return (
    <Modal closeBtnRef={closeBtnRef} id="createCategoryModal" modalTitle="Create Mission Category" >
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="example work.."
          ref={name}

        />
        <label htmlFor="floatingInput">Category Name:</label>
      </div>
      <div className="form-floating">
        <select className="form-select" id="floatingSelectGrid" defaultValue='' ref={badge} >
          <option value=''  disabled>Choose Badge:</option>
          {options.map(({label,value})=>(
            <Option key={value}
            label={label}
            value={value}
            />
          ))}
        </select>
        <label htmlFor="floatingSelectGrid">Define Category Importance</label>
      </div>
      <div className="text-center">
      <Button type="success my-4" clicked={clickHanlder} disabled={loading}>
            {
              loading?(<> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Creating...</>):<span>Create Category</span>
            }
            
      </Button>
      </div>
      
    </Modal>
  );
};

export default memo(CategoryModal)
