import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import * as actionCreator from "../actionCreator"


export const findProfileData=(uid)=>async dispatch=>{

    try {
        dispatch(actionCreator.findProfileDataStart())
        if(!uid) throw Error('Invalid user id!')
        //get user
        const profileRef=doc(db,'users',uid)
        let profileSnapshot=await getDoc(profileRef)
        if(!profileSnapshot.exists()) throw Error('No Such User Exists')
        
        dispatch(actionCreator.findProfileDataSuccess({
            uid:profileSnapshot.id,
            ...profileSnapshot.data()
        }))
        
    } catch (error) {
        // console.error(error)
        toast.error(error.message)
        dispatch(actionCreator.findProfileDataFail(error.message))
        
    }
}