import { toast } from "react-toastify"
import {  collection,onSnapshot, query, where,addDoc, doc, deleteDoc, updateDoc, getDoc} from "firebase/firestore"
import { db } from "../../firebase"

import * as actionCreator from "../actionCreator"

export const fetchMissions=(uid,category)=>(dispatch)=>{
    try {
        if(!uid) throw Error('Invalid Credentials!')
        let missionRef=query(collection(db,'missions'),where('user','==',uid))
        if(category!=='all')  missionRef=query(collection(db,'missions'),where('user','==',uid),where('category','==',category.trim()))
        onSnapshot(missionRef,snapshot=>{
            dispatch(actionCreator.fetchMissionsStart())
            let missions=[]
            if(!snapshot.empty){
                snapshot.docs.forEach(doc=>{
                    let newDoc={
                        id:doc.id,
                        ...doc.data()
                    }
                    missions=missions.concat(newDoc)
                })
            }
            dispatch(actionCreator.fetchMissionsSuccess(missions))
        })
    } catch (error) {
        // console.error(error);
        toast.error(error.message)
        dispatch(actionCreator.fetchMissionsFail(error.message))
    }
}

//add new mission
export const addNewMission=(credentials)=>async dispatch=>{
    try {
        dispatch(actionCreator.addMissionStart())
        const {uid,content,category,badge}=credentials
        if(!uid || !content || !category || !badge) throw Error('Invalid Credentials!')
        
        const docRef=collection(db,'missions')
        await addDoc(docRef,{
            user:uid,
            content,
            category,
            badge,
            createdAt:new Date().toISOString(),
            isCompleted:false
        })
        toast.success(`New Mission in ${category} Category added!`)
    } catch (error) {
        // console.error(error);
        dispatch(actionCreator.addMissionFail(error.message))
        toast.error(error.message)
    }
}



//------------------- DELETE MISSION FUN---------------------
//add new mission
export const deleteMission=(id)=>async dispatch=>{
    try {
        dispatch(actionCreator.deleteMissionStart())
        if(!id) throw Error('Invalid Credentials!')
        
        const docRef=doc(db,'missions',id)
        await deleteDoc(docRef)
        toast.info(`Mission Removed!`)
    } catch (error) {
        // console.error(error);
        dispatch(actionCreator.deleteMissionFail(error.message))
        toast.error(error.message)
    }
}

export const updateMission=(updateCredentials,id,navigate)=>async dispatch=>{
    try {
        dispatch(actionCreator.editMissionStart())
        if(!id) throw Error('Invalid Credentials!')

        const docRef=doc(db,'missions',id)
        await updateDoc(docRef,updateCredentials)
        dispatch(actionCreator.editMissionSuccess())
        toast.info(`Content Updated!`)
        if(navigate){
            navigate(`/dashboard/${updateCredentials.category}`)
        }
        
    } catch (error) {
        // console.error(error);
        dispatch(actionCreator.editMissionFail(error.message))
        toast.error(error.message)
    }
}


export const fetchMissionById=(id)=>async dispatch=>{
    try {
        dispatch(actionCreator.fetchSpecificMissionStart())
        if(!id) throw Error('Invalid Credentials!')

        const docRef=doc(db,'missions',id)
        const docSnapshot=await getDoc(docRef)
        if(!docSnapshot.exists()) throw Error("No Such Mission Exists!")
        dispatch(actionCreator.fetchSpecificMissionSuccess({
            id:docSnapshot.id,
            ...docSnapshot.data()
        }))
        
    } catch (error) {
        // console.error(error);
        dispatch(actionCreator.fetchSpecificMissionFail(error.message))
        toast.error(error.message)
    }
}