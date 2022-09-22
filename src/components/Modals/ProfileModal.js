import Modal from "components/ui/Modal"
import { motion } from "framer-motion"
import PropTypes from "prop-types"
import { memo } from "react"
const ProfileModal = ({ user }) => {
  return (
    <Modal id="profileModal" modalTitle={'Profile: '+user.displayName} >
      <div className="px-2 py-4 text-center">
        <div className="img-wrapper my-2">
          <motion.img 
          initial={{y:-10}}
          animate={{y:[10,-10,10]}}
          transition={{ repeat: Infinity, duration: 4 ,type:"tween",repeatType: "reverse"}}
          loading="lazy" referrerPolicy="no-referrer" src={user.photoURL} alt={user.displayName} width="200" height="200" className="rounded-circle border border-dark shadow-lg border-5" />
        </div>
        <h5 className="text-info">{user.displayName}</h5>
        <p className="fs-5 lead">{user.email}</p>
      </div>
    </Modal>
  )
}

ProfileModal.propTypes = {
  user: PropTypes.object.isRequired,
}

export default memo(ProfileModal)