const defualtState= {
    user: {},
    token: null
}

const auth = (state = defualtState , action)=>{
    switch (action.type){
        case 'LOGIN': 
            return{
                ...state,
                user: action.payload,
                token: action.payload.token
            }
        default:
            return state;
    }
}

export default auth;