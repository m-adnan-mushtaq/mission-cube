import Button from "components/ui/Button"
import { useDispatch } from "react-redux"
import { socialAuthHelper } from "store"


const SocialButtons = () => {
    const dispatch=useDispatch()
    const googleBtnClickHandler=()=>{
        dispatch(socialAuthHelper('GOOGLE'))
    }
    const githubBtnClickHandler=()=>{
        dispatch(socialAuthHelper('GITHUB'))
    }
    return (
        <>
            <hr />
            <Button type="dark my-2 w-100 d-block rounded-pill"
            clicked={githubBtnClickHandler}
             >
                <i className="fa fa-github me-2" aria-hidden="true"></i> Continue with GitHub
            </Button>
            <p className="divider-text">or</p>
            <Button type="danger my-2 w-100 d-block rounded-pill" clicked={googleBtnClickHandler}>
                <i className="fa fa-google-plus me-2" aria-hidden="true"></i> 
                Continue with Google
            </Button>
        </>
    )
}

export default SocialButtons