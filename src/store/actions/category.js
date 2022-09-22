import { toast } from "react-toastify"
import { addDoc, collection,deleteDoc,doc,getDocs,onSnapshot, query, where, writeBatch} from "firebase/firestore"
import { db } from "../../firebase"
import * as actionCreator from "../actionCreator"

//find categories lits
export const findAllCategories=(uid)=>dispatch=>{
    try {
        if(!uid) throw Error('Invalid Credentials!')
        const categoryRef=query(collection(db,'categories'),where('user','==',uid))
        //realtime observer for changes to categories
        onSnapshot(categoryRef,snapshot=>{
            let categoreis=[]
            dispatch(actionCreator.findCatagoriesStart())
            if(!snapshot.empty){
                snapshot.docs.forEach(doc=>{
                    let newDoc={
                        id:doc.id,
                        ...doc.data()
                    }
                    categoreis=[...categoreis,newDoc]
                })
            }
            dispatch(actionCreator.findCatagoriesSuccess(categoreis))
        })
    } catch (error) {
        // console.error(error);
        dispatch(actionCreator.findCatagoriesFail(error.message))
        toast.error(error.message)
    }
}


//add new category 
export const addNewCategory=(credentials)=>async dispatch=>{
    try {
        dispatch(actionCreator.createCategoryStart())
        const {uid,name,badge}=credentials
        if(!uid || !name || !badge) throw Error('Invalid Credentials!')
        
        const docRef=collection(db,'categories')
        await addDoc(docRef,{
            user:uid,
            name,badge
        })
        dispatch(actionCreator.createCategorySuccess())
        toast.info(`New Category ${name} added!`)
    } catch (error) {
       
    }
}



export const deleteCategory=(credentials,navigate)=>async dispatch=>{
    try {
        dispatch(actionCreator.deleteCategoryStart())
        const {category,uid,id}=credentials
        if(!category || !uid || !id) throw Error("Invalid Credentials!")
        const catRef=doc(db,'categories',id)

        const batch=writeBatch(db)
        //get all documents and delete it
        const missionSnaps=await getDocs(query(collection(db,'missions'),where('user','==',uid),where('category','==',category.trim())))
        missionSnaps.forEach(missionDoc=>{
            let docRef=doc(db,'missions',missionDoc.id)
            batch.delete(docRef)
        })
        await batch.commit()
        //delet category
        await deleteDoc(catRef)
        toast.success(`Category ${category} deleted!`)
        // window.location.href='/dashboard'
        navigate('/dashboard')
    } catch (error) {
        // console.error(error);
        dispatch(actionCreator.deleteCategoryFail(error))
        toast.error(error.message)
    }
}