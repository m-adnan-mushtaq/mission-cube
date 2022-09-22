import { useSelector } from "react-redux";
import Spinner from "components/ui/Spinner";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const withEnsureAuth = (WrappedComponent) => (props) => {

  const { user, loading, error } = useSelector(state => state.auth)
  if (loading) {
    return <Spinner />
  }
  if (!user && !loading) {
    toast.warning('Make sure to Sign in to view resoures')
    return (<Navigate to='/sign-in' replace />)
  }
  return <WrappedComponent {...props} error={error} user={user} />;
};

export default withEnsureAuth;
