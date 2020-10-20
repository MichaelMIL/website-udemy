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

export const registerAdmin = (name, email, pass,token)=>{
    return dispatch=>{
        API.registerAdmin(name,email,pass,token, res=>{
            if(res.status === 200){

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

export const login = (email, pass)=>{
    return (dispatch)=>{
        API.loginAdmin(email,pass,res =>{
            console.log("resualt", res);
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