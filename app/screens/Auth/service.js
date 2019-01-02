import { Auth } from 'aws-amplify';
// import { $toast } from '../utils'




export const login = (email, password) => {
    // check the current user when the App component is loaded
    return Auth.signIn(email, password);
}

export const register = (email, password) =>{
    return Auth.signUp({ 
            username: email,
            password,
            attributes: {
                email
            },
            validationData: []  //optional
        })
}

export const verify = (email, code)=> {
    return Auth.confirmSignUp(email, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true    
    })
}

export const resend = (email) =>{
    return Auth.resendSignUp(email)
}

export const logout = ()=> {
    return Auth.signOut()
}
