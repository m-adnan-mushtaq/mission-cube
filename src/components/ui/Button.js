import { motion } from "framer-motion";
import PropTypes from "prop-types"

const Button = (props) => {
  return (
    <motion.button
    initial={{opacity:0}}
    animate={{opacity:1}}
    whileTap={{scale:0.9}}
    whileHover={{scale:1.1}}
    disabled={props.disabled}
    className={`btn btn-${props.type}`}
    onClick={props.clicked}
    type="button"
    {...props.addons}
    >
        {props.children}
    </motion.button>
  )
}

Button.propTypes={
    type:PropTypes.string.isRequired,
    clicked:PropTypes.func
}
export default Button