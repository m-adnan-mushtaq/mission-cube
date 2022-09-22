import { useSelector } from "react-redux";
import Spinner from "components/ui/Spinner";
import { Navigate } from "react-router-dom";

const withRedirectAuth = (WrappedComponent) => (props) => {

    const { user, loading, error } = useSelector(state => state.auth)
    if (loading) {
        return <Spinner />
    }
    if ( !loading && user) {
        return (<Navigate to='/dashboard' replace />)
    }
    return <WrappedComponent {...props} error={error}  />;
};

export default withRedirectAuth;
