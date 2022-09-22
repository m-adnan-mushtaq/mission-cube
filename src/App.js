
import "./container/css/bootstrap.min.css"
import "./container/css/style.css"

import UiToast from "components/ui/Toast";
import AnimatedRoutes from "components/AnimatedRoutes";

import { useDispatch, useSelector } from "react-redux";
import { authenticationCheckerHelper } from "store";
import { useEffect } from "react";
import Spinner from "components/ui/Spinner";
import ErrorMsg from "components/ErrorMsg";
import ErrorBoundary from "components/ErrorBoundary";


function App() {
    const dispatch=useDispatch()
    const {trackerError,trackerLoading}=useSelector(state=>state.auth)
    useEffect(()=>{
        dispatch(authenticationCheckerHelper())
    },[dispatch])
    
    if(trackerLoading){
        return <Spinner/>
    }
    if(trackerError){
        return <ErrorMsg msg={trackerError} />
    }
    return (
        <>
            <ErrorBoundary>
                <UiToast />
                <AnimatedRoutes />
            </ErrorBoundary>
        </>
    );
}

export default App;
