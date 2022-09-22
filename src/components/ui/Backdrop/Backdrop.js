
import { motion, AnimatePresence } from "framer-motion"

import "./backdrop.css"
const BackDrop = props => {
    return (
        <AnimatePresence>
            {props.show && <motion.div
                className="model-wrapper"
                onClick={props.modalClosed}
                initial={{
                    opacity: 0
                }}
                animate={{
                    background: "rgba(0,0,0,0.6)",
                    opacity: 1,
                    transition: {
                        when: "beforeChildren",
                        staggerChildren: 0.5,
                    }
                }}
                exit={{
                    opacity: 0,
                    delay:1
                }}
                key="model"
            >
                <motion.div className="custom-modal-content bg-secondary shadow-lg rounded p-2"
                    onClick={(e)=>e.stopPropagation()}
                    initial={{
                        y: "-100vh",
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            delay: 0.2,
                            duration:0.5
                        }
                    }}
                    exit={{
                        y:"-100vh",
                        transition:{
                            duration:0.5
                        }
                    }}
                >
                  {props.children}

                </motion.div>
            </motion.div> }
        </AnimatePresence>
    )
}
export default BackDrop

