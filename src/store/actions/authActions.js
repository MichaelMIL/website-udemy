import API from '../../utils/api';


export const login = (email, pass)=>{
    return (dispatch)=>{
        API.login(email,pass,res =>{
            dispatch({
                        type: 'LOGIN',
                        payload: {
                            email,
                            token: res.data.id,
                            user_id: res.data.userId
                        }
            })

            API.getUserById(res.data.userId, res.data.id, res2=>{
                dispatch({
                    type: 'AFTER_LOGIN',
                    payload: res2.data
                })
            })
        })
    }

}

export const register = (name, email,pass)=>{
    return dispatch=>{
        API.register(name,email,pass, res=>{
            if(res.status === 200){
                dispatch(login(email,pass));
            }else{
                if(res.message){
                    dispatch({
                        type: 'SHOW_ERROR',
                        payload: 'Exisisting email, Do you have an account?'
                    })
                }
            }
        })
        /*type: 'REGISTER',
        payload: {email,pass}*/
    }
}
