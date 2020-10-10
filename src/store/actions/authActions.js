export const login = (email, pass)=>{
    return{
        type: 'LOGIN',
        payload: {email,pass}
    }
}