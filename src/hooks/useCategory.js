

//hook responsible for finding target category of current page and returing it
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"


const useCategory = () => {
    const params = useParams()
    const { data: categories } = useSelector(state => state.categories)
    let category = params?.category
    let targetCat = categories.find(elm => elm.name === category)
    return targetCat
}

export default useCategory
