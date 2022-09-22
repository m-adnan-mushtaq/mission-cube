import React from 'react'
import PropTypes from "prop-types"
const Modal = (props) => {
    return (
        <div
        className="modal  fade " id={`${props.id}`} tabIndex="-1" aria-labelledby={`${props.id}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${props.id}Label`}>{props.modalTitle}</h5>
                        <button ref={props.closeBtnRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes={
    id:PropTypes.string.isRequired
}
export default Modal