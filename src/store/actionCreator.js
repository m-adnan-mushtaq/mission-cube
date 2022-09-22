
import { createAction } from "@reduxjs/toolkit"

//--------- GLOBAL ACTIONS FOR SHOWING ALERT MESSAGES-----------------
export const showMsgToast=createAction('toasts/showMsgToast',(toastBody,toastType,toastTitle)=>{
    return{
        payload:{
            toastBody,toastTitle,toastType
        }
    }
})

//---------------------------- 🔐 AUTHENTICATION ACTIONS CREATOR 🔒---------------

export const authStateTrackerStart=createAction('auth/authStateTrackerStart')
export const authStateTrackerSuccess=createAction('auth/authStateTrackerSuccess')
export const authStateTrackerFail=createAction('auth/authStateTrackerFail')
export const authStateTrackerError=createAction('auth/authStateTrackerError')
export const singUpStart=createAction('auth/singUpStart')
export const singUpSuccess=createAction('auth/singUpSuccess')
export const singUpFail=createAction('auth/singUpFail')
export const signInStart=createAction('auth/signInStart')
export const signInSuccess=createAction('auth/signInSuccess')
export const signInFail=createAction('auth/signInFail')
export const signOutStart=createAction('auth/signOutStart')
export const signOutSuccess=createAction('auth/signOutSuccess')
export const signOutFail=createAction('auth/signOutFail')


//-----------------------------👨‍💻 FIND USER ACTIONS 👨‍💻----------------
export const findProfileDataStart=createAction('loggedUser/findProfileDataStart')
export const findProfileDataSuccess=createAction('loggedUser/findProfileDataSuccess')
export const findProfileDataFail=createAction('loggedUser/findProfileDataFail')


//----------------  CATAGORIES ACTIONS--------------------------------------
export const findCatagoriesStart=createAction('catagories/findCatagoriesStart')
export const findCatagoriesSuccess=createAction('catagories/findCatagoriesSuccess')
export const findCatagoriesFail=createAction('catagories/findCatagoriesFail')
export const createCategoryStart=createAction('catagories/createCategoryStart')
export const createCategorySuccess=createAction('catagories/createCategorySuccess')
export const createCategoryFail=createAction('catagories/createCategoryFail')
export const deleteCategoryStart=createAction('catagories/deleteCategoryStart')
export const deleteCategorySuccess=createAction('catagories/deleteCategorySuccess')
export const deleteCategoryFail=createAction('catagories/deleteCategoryFail')



//------------------ MISSIONS ACTIONS--------------------------------------
export const fetchMissionsStart=createAction('missions/fetchMissionsStart')
export const fetchMissionsSuccess=createAction('missions/fetchMissionsSuccess')
export const fetchMissionsFail=createAction('missions/fetchMissionsFail')
export const addMissionStart=createAction('missions/addMissionStart')
export const addMissionFail=createAction('missions/addMissionFail')
export const editMissionStart=createAction('missions/editMissionStart')
export const editMissionSuccess=createAction('missions/editMissionSuccess')
export const editMissionFail=createAction('missions/editMissionFail')
export const deleteMissionStart=createAction('missions/deleteMissionStart')
export const deleteMissionFail=createAction('missions/deleteMissionFail')
export const filterMissions=createAction('missions/filterMissions')
export const fetchSpecificMissionStart=createAction('missions/fetchSpecificMissionStart')
export const fetchSpecificMissionSuccess=createAction('missions/fetchSpecificMissionSuccess')
export const fetchSpecificMissionFail=createAction('missions/fetchSpecificMissionFail')
