import api from "../config/api"

export function registerUser(userInfo) {
    const {username, email, password} = userInfo
    // call to server to register user
    try {
        return api.post("/auth/register", userInfo)
    }
    catch (error) {
        console.log("An error occurred calling api in registerUser")
        throw(error)
    }
    return true
}

export function loginUser(userInfo) {
    // const {username, password} = userInfo
    try {
        return api.post("/auth/login", userInfo)
    }
    catch (error) {
        console.log("an error occurred calling api")
        throw(error)
    }
    // call to server to login user
    // return user info if successful and error if not
    // return {
    //     userInfo: userInfo,
    //     error: null
    // }
}

export function logoutUser(username) {
    // call to server to logout user
    try {
        return api.get("/auth/logout")
    }
    catch (error) {
        console.log("an error occurred logging out", error)
        throw(error)
    }
}

export async function userAuthenticated() {
    try {
        const response =  await api.get("/auth/user")
        return response
    }
    catch(error) {
        console.log("an error occurred checking for authenticated user")
        throw(error)
    }
}

// Get loggedInUser from localStorage
export function getLoggedInUser() {
    return localStorage.getItem("loggedInUser")
}

// Store loggedInUser username in local storage
export function setLoggedInUser(user) {
    user ? localStorage.setItem("loggedInUser", {"username": user.username, "role": user.role}) : localStorage.removeItem("loggedInUser")
}
