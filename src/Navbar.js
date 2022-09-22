import { motion } from "framer-motion"

const container = {
    hidden: {
        y: "-100vh"
    },
    show: {
        y: 0
    }
}
const button = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    hover: {
        scale: 1.1
    },
    tap: {
        scale: 0.9
    }
}
const Navbar = ({toggleSidebar,handleChange,query}) => {
    return (
        <motion.nav className="navbar navbar-expand-lg navbar-dark  bg-secondary"
             variants={container}
            initial="hidden"
            transition={{
                type: "spring",
                stiffness: 90,
                damping: 10

            }}
            animate="show"
        >
            <div className="container-fluid">
                <div className="navbar-brand">

                    <button type="button" onClick={toggleSidebar} id="sidebarCollapse" className="navbar-btn bg-dark text-light me-2">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item py-2 py-lg-0 me-2">
                            <input type="text" value={query} aria-label="Search" onChange={handleChange} className="form-control" name="search" id="search" placeholder="type here..." />
                        </li>
                        <li className="nav-item">
                            <motion.button className="btn btn-success shadow rounded" variants={button} data-bs-toggle="modal" data-bs-target="#createCategoryModal"
                                whileHover="hover"
                                whileTap="tap">

                                <i className="fa fa-plus me-1 " aria-hidden="true"></i>

                                New Category
                            </motion.button>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar