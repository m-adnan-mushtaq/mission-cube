import { motion } from "framer-motion"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { findAllCategories } from "store"
const container = {
    hidden: { opacity: 0, x: -100 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 2,
            delayChildren: 2,
            staggerChildren: 0.5
        }
    }
}

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}


const CategoryList = () => {
    const { auth, categories } = useSelector(state => state)
    const { uid } = auth.user
    const { loading, error, data } = categories
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(findAllCategories(uid))
    }, [uid,dispatch])


    if (loading) {
        return (<div className="text-center">
            <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>)
    }
    if(error){
        return <div className="alert alert-danger">{error}</div>
    }
    return (
        data!==null && 
            <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="list-unstyled components rounded bg-secondary mx-2" style={{ "borderRadius": "2em" }}>
            <motion.li variants={item}>
                <NavLink to="/dashboard" end>View All</NavLink>
            </motion.li >
            {data.length===0 && <p className=" fs-6">No Catagories added Yet!</p>}
            {(data.length>0) && data.map(elm=>(
                 <motion.li variants={item} key={elm.id}>
                 <NavLink to={`/dashboard/${elm.name}`}>{elm.name}</NavLink>
             </motion.li >
            )) }

        </motion.ul>
        
       
    )
}

export default CategoryList