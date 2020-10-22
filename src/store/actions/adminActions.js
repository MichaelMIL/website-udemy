import API from '../../utils/api';

export const getUsers = (token)=>{
    return (dispatch)=>{
        API.getUsers(token, res=>{
            dispatch({
                type: 'GOT_USERS',
                payload: res.data
            })
        })
    }
}


export const getPosts = (token)=>{
    return (dispatch)=>{
        API.getPosts(token , res=>{
            dispatch({
                type: 'GOT_POSTS',
                payload: res.data
            })
        })
    }
}

export const addPost = (post,token)=>{
    return dispatch=>{
        API.addPost(post,token,res =>{
            dispatch({
                type: 'POST_ADDED',
                payload: res.data
            })
        })
    }
}

export const getSinglePost = (id, token)=>{
    return dispatch=>{
        API.getSinglePost(id,token,res=>{
            dispatch({
                type: 'GOT_SINGLE_POST',
                payload : res.data
            })
        })
    }
}

export const updatePost = (post,token)=>{
    return dispatch=>{
        API.updatePost(post,token,res=>{
            dispatch({
                type:'POST_UPDATED',
                payload: res.data
            })
        })
    }
}

export const uploadImage = (data,token,posdId,userId)=>{
    return dispatch=>{
        API.uploadImage(data,token,posdId,userId,res=>{
            dispatch({
                type:'UPLOADED_IMAGE',
                payload: res.data
            })
        })
    }
}

export const registerAdmin = (name, email, pass)=>{
    return dispatch=>{
        API.registerAdmin(name,email,pass, res=>{
            if(res.status === 200){
                dispatch({
                    type: 'REGISTER',
                    payload: res.data
                })
            }else{
                if(res.message){
                    dispatch({
                        type: 'SHOW_ERROR',
                        payload: 'Exisisting email'
                    })
                }
            }
        })
        /*type: 'REGISTER',
        payload: {email,pass}*/
    }
}



export const loginAdmin = (email, pass)=>{
    console.log("logging in", email, pass)
    return (dispatch)=>{
        API.loginAdmin(email,pass,res =>{
            dispatch({
                        type: 'LOGIN',
                        payload: {
                            email,
                            token: res.data.id,
                            user_id: res.data.userId
                        }
            })

            API.getAdminUserById(res.data.userId, res.data.id, res2=>{
                dispatch({
                    type: 'AFTER_LOGIN',
                    payload: res2.data
                })
            })
        })
    }

}

export const setAdmin = (token, userId)=>{
    return dispatch=>{
        API.setAdmin(token,userId,res=>{
            dispatch({
                type:'SET_TO_ADMIN',
                payload: res.data
            })
        })
    }
}