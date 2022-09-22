import {Link,useOutletContext} from "react-router-dom"
import { motion } from "framer-motion"
const Step2 = () => {
    const {fileRef,submitHanlder}=useOutletContext()
    return (
        <motion.div
        initial={{opacity:0,x:200}}
        animate={{opacity:1,x:0}}
        transition={{type:"tween"}}
        exit={{opacity:0,x:"-100vw"}}
        >
            <h5 className="fw-bold text-center my-3">
                Upload new Profile Picture
            </h5>
            <div >
                <div className="my-5">
                    <label htmlFor="formFile" className="form-label">Select Picture* / upto 2MB</label>
                    <input required className="form-control" ref={fileRef} type="file" id="formFile" accept='images/*'  max="1"/>
                </div>
                <div className="button-row d-flex justify-content-between my-3">
                    <Link to='/sign-up' className="btn btn-light">Back</Link>
                    <button type="submit" onClick={submitHanlder} className="btn btn-success">Sign Up</button>
                </div>
            </div>
        </motion.div>
    )
}

export default Step2