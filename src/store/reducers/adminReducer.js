const defualtState = {
    users: [],
    posts: [],
    user: {},
    token: null,
    error: null,
    post:{}
}

const admin= (state = defualtState, action)=>{
    switch (action.type){
        case 'GOT_USERS':
            return {
                ...state,
                users: action.payload 
            }
        case 'LOGOUT': 
            return{
                ...state,
                user: null,
                token: null
            }
        case 'GOT_POSTS':
            return{
                ...state,
                posts: action.payload
            }
        case 'AFTER_LOGIN':{
                return{
                    ...state,
                    user: action.payload,
                }
            }
        case 'LOGIN': 
            return{
                ...state,
                user: action.payload,
                token: action.payload.token
            }
        case 'POST_ADDED':
            return{
                ...state,
                posts: state.posts.concat(action.payload),
                post: action.payload
            }

        case 'GOT_SINGLE_POST':
            return{
                ...state,
                post: action.payload
            }       
        case 'GOT_SINGLE_USER':
            return{
                ...state,
                user: action.payload
            }
        case 'SET_TO_ADMIN':
            return{
                ...state
            }
        case 'REGISTER':
            return{
                ...state,
                adminId: action.payload.id
            }
        case 'UPLOADED_IMAGE':
            return{
                ...state,
                post:{
                    ...state.post,
                    PostImage: [action.payload]
                }
            }
        case 'SHOW_ERROR':
            return{
                ...state,
                error: action.payload
            }
        case 'POST_UPDATED':
            return{
                ...state,
                post:{
                    ...state.post,
                    ...action.payload
                },
                posts: state.posts.map(p=>{
                    if(p.id === action.payload.id){
                        // this is the exisiting post in redux that has been update
                        return{
                            ...p,
                            ...action.payload
                        }
                    } else {
                        return p;
                    }
                })
            }
        case 'USER_UPDATED':
            return{
                ...state,
                user:{
                    ...state.user,
                    ...action.payload
                },
                users: state.users.map(p=>{
                    if(p.id === action.payload.id){
                        // this is the exisiting post in redux that has been update
                        return{
                            ...p,
                            ...action.payload
                        }
                    } else {
                        return p;
                    }
                })
            }

        default:
            return state
    }
}

export default admin;