// error boundary for error handling in app not to crash app 
import React, { Component } from "react";
class ErrorBoundary extends Component {
    // component did catch 
    state = { hasError: false, errorMsg: '' }
    componentDidCatch = (error, info) => {
        // console.error( error);
        this.setState({ hasError: true, errorMsg: JSON.stringify(error) })
    }
    render() {
        // if there is error show error otherwise show it's children wrapped element
        if (this.state.hasError) {
            return (
                <div className="d-flex vh-100 justify-content-center align-items-center shadow rounded-lg">
                    <div className="alert alert-danger p-5" role="alert">
                        <h4 className="alert-heading">Aww Snap, Internal Server Error 500</h4>
                        <p>
                            <i className="fa fa-exclamation-triangle me-2" aria-hidden="true"></i>
                            Somethig Went Wrong,we applogize for inconvence</p>
                        <hr />
                        <p className="mb-0">
                            {this.state.errorMsg}
                        </p>
                    </div>
                </div>
            )
        }
        return (
            <>
                {this.props.children}
            </>

        )
    }
}

export default ErrorBoundary;