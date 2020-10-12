import API from '../../utils/api';


export const login = (email, pass)=>{
    return (dispatch)=>{
        API.login(email,pass,res =>{
            console.log("resualt", res.data);
            dispatch({
                        type: 'LOGIN',
                        payload: {
                            email,
                            token: res.data.id,
                            user_id: res.data.userId
                        }
            })
        })
    }

}

export const register = (email,pass)=>{
    return{
        type: 'REGISTER',
        payload: {email,pass}
    }
}