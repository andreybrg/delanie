export const getLocalStorageAuthData = () => {
    return ({
        token: localStorage.getItem('authToken'),
        userId: localStorage.getItem('userId')
    })
}

export const removeLocalStorageAuthData = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
}

export const setLocalStorageAuthData = (token, id) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('userId', id)
}