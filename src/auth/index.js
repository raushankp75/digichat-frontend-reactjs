// is logged in
export const isAuthenticated = () => {
    let data = localStorage.getItem('loggedInData')

    if (data != null) {
        return true;
    }else{
        return false;
    }
}

// dologin -> set data to localstorage
export const doLogin = (loggedInData, next) => {
    localStorage.setItem('loggedInData', JSON.stringify(loggedInData));
    next();
}

// dologout -> remove data from localstorage
export const doLogout=()=>{
    localStorage.removeItem('loggedInData');
    window.location.href = '/'
}

// get current user
export const getCurrentUserDetails =()=>{
    if(isAuthenticated){
        return JSON.parse(localStorage.getItem('loggedInData'));
    }else{
        return undefined;
    }
}
