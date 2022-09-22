
const Spinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">

            <div className="text-center my-2">
                <div className="spinner-border my-auto" role="status"
                    style={{
                        "width": "3rem",
                        "height": "3rem"
                    }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Spinner