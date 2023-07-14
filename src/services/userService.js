import { myAxios } from "./helper";

export const signup = (signupData, pic) => {
    console.log(signupData, pic)
    return myAxios.post('/api/user', {signupData, pic})
        .then((response) => {
            response.data
        })
}