export function registerUser(userInfo) {
    const {username, email, password} = userInfo
    // call to server to register user
    return true
}

export function loginUser(userInfo) {
    const {username, password} = userInfo
    // call to server to login user
    // return user info if successful and error if not
    return {
        userInfo: userInfo,
        error: null
    }
}

export function logoutUser(username) {
    // call to server to logout user
}