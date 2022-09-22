import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import * as actionCreator from "../actionCreator";
import { getDownloadURL, uploadString, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { auth, db, githubProvider, googleProvider, storage } from "../../firebase";
import { toast } from "react-toastify"

//---------- whole authentication state handler function---------------------------------//
export const authenticationCheckerHelper = () => {
    return (dispatch) => {
        dispatch(actionCreator.authStateTrackerStart());
        try {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const { email, uid } = user
                    dispatch(
                        actionCreator.authStateTrackerSuccess({
                            email, uid
                        })
                    );
                } else {
                    dispatch(actionCreator.authStateTrackerFail());
                }
            });
        } catch (error) {
            // console.error(error);
            let msg =
                "Something Went Wrong, Make sure internet connection!";
            dispatch(actionCreator.authStateTrackerError(msg));
            toast.error(msg)
        }
    };
};

//------------- create new account helper----------------------------------
export const singUpHelper = (userDoc, file) => async (dispatch) => {
    dispatch(actionCreator.singUpStart());
    let toastId = toast(`Setting Up Your account, please wait!`, {
        autoClose: false,
        closeButton: false,
        isLoading: true

    })
    try {
        if (!userDoc || !file) throw Error("Invalid Credentials");
        const { name, email, password } = userDoc;
        if (!name || !email || !password) throw Error("Invalid Credentials!");

        await checkUserExists(email)
        //upload user profile pic
        const fileUrl = await uploadAndGetUrl(file);
        if (!fileUrl) throw Error("Failed to get file url");

        let { user } = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(user.uid);
        //create user doc
        await saveUserToFirebase(user.uid, {
            displayName: name,
            email,
            photoURL: fileUrl
        })
        dispatch(actionCreator.singUpSuccess())
        toast.update(toastId, {
            render: 'Successfully Created Account! 😁',
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
            closeButton: true,
            isLoading: false
        })
    } catch (error) {
        // console.error(error);
        toast.update(toastId, {
            render: 'Failed to create account,Something Went Wrong!',
            type: toast.TYPE.ERROR,
            autoClose: 5000,
            closeButton: true,
            isLoading: false
        })
        dispatch(actionCreator.singUpFail(error.message))

    }
};

export const singInHelper = (user) => async dispatch => {
    try {
        dispatch(actionCreator.signInStart());
        const { email, password } = await user
        if (!email || !password) throw Error('Invalid Credentials!, try again!')
        await signInWithEmailAndPassword(auth, email, password)
        dispatch(actionCreator.signInSuccess())

    } catch (error) {
        // console.error(error);
        dispatch(actionCreator.signInFail(error.message))
        toast.error(error.message)

    }
}


//-------------- GOOGLE AUTH HANDLING----------------------
export const socialAuthHelper = (providerType) => async dispatch => {
    let provider;
    if(!providerType) return
    if(providerType === 'GOOGLE') provider=googleProvider
    if(providerType ==='GITHUB') provider=githubProvider
    try {
        dispatch(actionCreator.signInStart())

        const result = await signInWithPopup(auth, provider)
        const user = result.user
        if (!user) throw Error('Failed to Authenticate, Invalid Credentials')
        const { uid, photoURL, displayName, email } = user
        if (!uid) throw Error('Invalid Credentials!')
        //check if user not exists then save it
        let userSnapshot = await getDoc(doc(db, 'users', uid))
        if (!userSnapshot.exists()) {
            //save user to the data-base
            await saveUserToFirebase(uid, {
                email, photoURL, displayName
            })
            toast.success('Successfully Created Account 😁')
        }
        dispatch(actionCreator.signInSuccess())

    } catch (error) {
        // console.error(error)
        dispatch(actionCreator.signInFail(error.message))
        toast.error(error.message)
    }

}






//--------- logout helper----------------
export const logOutHelper = () => async dispatch => {
    try {
        dispatch(actionCreator.signOutStart());
        await signOut(auth)
        dispatch(actionCreator.signOutSuccess())
        toast.info('Logged out, See you soon!')
    } catch (error) {
        dispatch(actionCreator.signOutFail(error.message))
        toast.error(error.message)

    }
}


//--------------------------------function file upload helper-----------------
async function uploadAndGetUrl(file) {
    try {
        //check file mimetype
        let allowedTypes = /png|jpeg|jpg/;
        if (!allowedTypes.test(file.type)) throw Error("invalid file type");
        //get file extensions
        let mimeType = file.type.split('/')[1]
        //give file unqiuename to avoid replacing files
        let fileRef = ref(storage, "profileImgs/" + uuidv4() + '.' + mimeType);
        //convert file to base64 string
        let fileEncoded = await readFileAsString(file);
        //upload file
        await uploadString(fileRef, fileEncoded, "data_url");
        //now get download url and return it
        return getDownloadURL(fileRef);
    } catch (error) {
        throw Error(error);
    }
}

const readFileAsString = (file) =>
    new Promise((res, rej) => {
        const reader = new FileReader(file);
        reader.addEventListener("load", () => {
            res(reader.result);
        });
        reader.addEventListener("error", () => {
            rej("failed to read file");
        });
        reader.readAsDataURL(file);
    });



async function checkUserExists(email) {
    try {
        const q = query(collection(db, 'users'), where('email', '==', email))
        let qSnapShot = await getDocs(q)
        if (!qSnapShot.empty) throw Error('User already exists')
        return
    } catch (error) {
        throw Error(error)
    }
}

async function saveUserToFirebase(uid, credentials) {
    let userRef = doc(db, "users", uid);
    try {
        return setDoc(userRef, credentials)
    } catch (error) {
        throw Error(error)
    }
}


