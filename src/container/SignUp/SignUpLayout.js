import { useRef} from 'react'
import { NavLink, Outlet } from "react-router-dom"
import useValidation from 'hooks/useValidation'
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux'
import { singUpHelper } from 'store/index'
import { toast } from 'react-toastify'
import withRedirectAuth from 'components/HOC/withRedirectAuth'


const container = {
    hidden: {
        opacity: 0,
        x: "100vw",
    },
    show: {
        opacity: 1,
        x: 0
    },
    leave: {
        opacity: 0,
        x: "-100vw"
    }
}


const SignUpLayout = ({error}) => {
    const dispatch = useDispatch()

    //local hooks
    const [name, isNameValid, onNameChange] = useValidation()
    const [email, isEmailValid, onEmailChange] = useValidation()
    const [password, isPasswordValid, onPasswordChange] = useValidation()
    // file handling
    const fileRef = useRef()

    const submitHanlder = (e) => {
        e.preventDefault()
        //get all credentials
        let currentFile = fileRef.current.files[0]
        if (!name || !email || !password || !currentFile) {
            toast.warning('Make sure, All inputs have valid value!')
            return
        }
        //make sure size of file is less than 2 MB
        if (currentFile.size > 2 * 1024 * 1024) {
            toast.warning('File size should max upto 2MB')
            return
        }
        //alos check mimetype
        if (!(/png|jpeg|jpg/.test(currentFile.type))) {
            toast.warning('Invalid file type! only images!')
            return
        }

        //if everything is fine submit the form
        const credentials = {
            name, email, password
        }
        dispatch(singUpHelper(credentials, currentFile))
    }
    return (
        <motion.div className="container-fluid"
            variants={container}
            initial="hidden"
            animate="show"
            exit="leave"
            transition={{ type: "tween" }}
        >
            <div className="auth-wrapper mx-auto my-3" >
                <div className="step-bar  d-flex justify-content-between align-items-center">
                    <NavLink className='rounded-pill disabled px-1 px-sm-4 py-2 shadow nav-link step ' to='/sign-up' end>
                        <i className="fa fa-edit me-2" aria-hidden="true"></i>
                        Create Account
                    </NavLink>
                    <NavLink className='rounded-pill px-1 px-sm-4 py-2 disabled shadow nav-link step ' to='/sign-up/upload-picture'>
                        <i className="fa fa-camera me-2" aria-hidden="true"></i>
                        Upload Picture
                    </NavLink>
                </div>
                <div className="card my-4 p-3    rounded shadow-lg">
                    {error && <div className='alert my-2 py-2 alert-danger'>{error}</div>}
                    <form action="">
                        <Outlet context={{
                            name, isNameValid, onNameChange,
                            email, isEmailValid, onEmailChange,
                            password, isPasswordValid, onPasswordChange,
                            fileRef, submitHanlder,

                        }} />
                    </form>

                </div>
            </div>
        </motion.div>
    )
}




export default withRedirectAuth(SignUpLayout)
