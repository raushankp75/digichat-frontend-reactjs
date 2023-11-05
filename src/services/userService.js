import { myAxios } from "./helper";

export const signup = (signupData, pic) => {
    // console.log(signupData, pic)
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    return myAxios.post('/api/user', {signupData, pic}, config)
        .then((response) => {
            return response.data
        })
}


export const login = (loginData) => {
    // console.log(signupData, pic)
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    return myAxios.post('/api/login', loginData, config)
        .then((response) => {
            return response.data
        })
}