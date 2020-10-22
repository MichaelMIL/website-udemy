import axios from 'axios';

let host;
if(process.env.NODE_ENV=== 'development'){
    host = 'http://localhost:8080';
} else{
    host = 'http://demoapi.michael.com';
}


const API= {
    makeFileURL: (url, token)=>{
        return host+url+'?access_token='+token;
    },
    login : (email,pass, success)=>{
        axios.post(`${host}/api/users/login`, {email: email, password:pass})
        .then(res=>{
            success(res);
        });
    },
    loginAdmin : (email,pass, success)=>{
        axios.post(`${host}/api/adminusers/login`, {email: email, password:pass})
        .then(res=>{
            success(res);
        });
    },
    register: (name,email,pass,success)=>{
        axios.post(`${host}/api/users`, {name: name,email: email, password: pass})
        .then(res=>{
            success(res);
        })
        .catch(err=>{
            success(err);
        })
    },
    registerAdmin: (name,email,token, pass,success)=>{
        axios.post(`${host}/api/adminusers`, {name: name ,email: email, password: pass})
        .then(res=>{
            success(res);
        })
        .catch(err=>{
            success(err);
        })
    },
    setAdmin:(token, userId, success)=>{
        axios.post(`${host}/api/adminusers/newAdmin?access_token=${token}`, {user_id: userId})
        .then(res=>{
            success(res);
        })
    },
    getUserById : (userId, token, success)=>{
        axios.get(`${host}/api/users/${userId}?access_token=${token}`, {
            params:{
                filter:{
                    include: "Profile"
                }
            }
        })
        .then(res=>{
            success(res);
        })
    },
    getAdminUserById : (userId, token, success)=>{
        axios.get(`${host}/api/adminusers/${userId}?access_token=${token}`)
        .then(res=>{
            success(res);
        })
    },
    getUsers : (token, success)=>{
        axios.get(`${host}/api/users?access_token=${token}`)
        .then(res=>{
            success(res);
        })
    },
    getPosts : (token, success)=>{
        axios.get(`${host}/api/posts?access_token=${token}`)
        .then(res=>{
            success(res);
        })
    },
    getSitePosts : (skip, success)=>{
        axios.get(`${host}/api/posts`,{
            params:{
                filter:{
                    skip: skip,
                    limit: 3,
                    include: 'PostImage',
                    fields:{
                        id: true,
                        title: true,
                        slug: true
                    
                    }
                }
            }
        })
        .then(res=>{
            success(res);
        })
    },
    addPost: (post, token ,success)=>{
        console.log("we are adding", post)
        axios.post(`${host}/api/posts?access_token=${token}`, post)
        .then(res=>{
            success(res);
        })
    },
    getSinglePost: (id,token,success)=>{
        axios.get(`${host}/api/posts/${id}?access_token=${token}`,{
            params:{
                filter:{
                    include:'PostImage'
                }
            }
        })
        .then(res=>{
            success(res);
        })
    },
    getPostCount:(success)=>{
        axios.get(`${host}/api/posts/count`)
        .then(res=>{
            success(res);
        })
    },
    updatePost: (post,token,success)=>{
        axios.patch(`${host}/api/posts/${post.id}?access_token=${token}`, post)
        .then(res=>{
            success(res);
        })
    },
    uploadImage: (data,token,postId,userId, success)=>{
        axios.post(`${host}/api/PostImages/upload?post_id=${postId}&access_token=${token}&user_id=${userId}`, data)
        .then(res=>{
            success(res);
        })
    },
    getPostBySlug: (slug,token, success)=>{
        axios.get(`${host}/api/Posts/findOne?access_token=${token}`, {
            params:{
                filter:{
                    where:{slug: slug},
                    include: {Comments: 'Profile'}
                }
            }
        })
        .then(res=>{
            success(res);
        })
    },
    postComment: (comment, token, success)=>{
        axios.post(`${host}/api/comments?access_token=${token}`, comment,{
            params:{
                filter:{
                    include: 'Profile'
                }
            }
        })
        .then(res=>{
            success(res);
        })
    },
    getCommentById: (commentId ,token, success)=>{
        axios.get(`${host}/api/comments/${commentId}?access_token=${token}`, {
            params:{
                filter:{
                    include: 'Profile'
                }
            }
        })
        .then(res=>{
            success(res);
        })
    }
};

export default API;