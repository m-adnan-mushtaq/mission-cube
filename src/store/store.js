import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/authReducer"
import categoryReducer from "./reducers/categoryReducer"
import missionReducer from "./reducers/missionReducer"
import profileReducer from "./reducers/profileReducer"

const store=configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer,
        categories:categoryReducer,
        missions:missionReducer
    },
    devTools:process.env.NODE_ENV === "development"
})


export default store