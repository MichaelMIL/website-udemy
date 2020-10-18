import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import {withFormik, Form} from 'formik';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import {FormikTextField, FormikSelectField} from 'formik-material-fields';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {withRouter} from 'react-router-dom';
import ImageIcon from '@material-ui/icons/Image';
import API from '../../../utils/api';
//import FormItems from '../../Common/FormItems';


/* global $ */


const styles = theme=>({
    container:{
        margin: theme.spacing.unit *3,
        display:'flex',
        flexDirection: 'row wrap',
        width:'100%'
    },
    formControl: {
        margin: theme.spacing.unit
    },
    leftSide:{
        flex:4,
        height: '100vh',
        margin: theme.spacing.unit *3,
        padding: theme.spacing.unit *3

    },
    rightSide:{
        flex:1,
        height: '100vh',
        margin: theme.spacing.unit *3,
        padding: theme.spacing.unit *3
    },
    save:{
        marginBottom: theme.spacing.unit *2
    },
    PostImage:{
        width: '100%'
    }
});


// const formItems=[
//     {name: "title", label: "Title", margin: "normal", onChange: "createSlug"},
//     {name: "slug", label: "Slug", margin: "normal"},
//     {name: "content", label: "Content", margin: "normal"}

// ]


class AddPost extends Component{

    componentDidUpdate(props,state){
        if(this.props.match.params.view ==='add' && this.props.admin.posts.filter(p => p.title === this.props.values.title).length > 0){
            const post = this.props.admin.posts.filter(p=> p.title === this.props.values.title)[0];
            this.props.history.push('/admin/posts/edit/'+post.dispatch);
        }

        if(this.props.admin.post.id !== props.admin.post.id){
            // when redux state changes post in admin reducer
            this.props.setValues(this.props.admin.post);
        }
    }

    uploadImage= (e)=>{
        const data = new FormData();
        data.append('file', e.target.files[0],new Date().getTime().toString()+e.target.files[0].name);
        this.props.uploadImage(data, this.props.auth.token, this.props.admin.post.id, this.props.auth.user.user_id);
    }

    componentDidMount(props, state){
        if(this.props.match.params.view === 'edit' && this.props.match.params.id){
            this.props.getSinglePost(this.props.match.params.id, this.props.auth.token)
        }
    }

    render(){
        const {classes} = this.props;
        return(
           <div>
               <h1>Add Post</h1>
               
               <Form  className={classes.container} >
                    <Paper className={classes.leftSide}>
                            {/* {formItems.map((item, index)=>{
                                return <FormItems {... item} key={index}/>
                            })}   */}

                        <FormikTextField 
                            name="title"
                            label="Title"
                            margin="normal"
                            onChange={e => this.props.setFieldValue('slug', e.target.value.toLowerCase().replace(/ /g,'_'))}
                            fullWidth
                        />
                        <FormikTextField 
                            name="slug"
                            label="Slug"
                            margin="normal"
                            fullWidth
                       />
                        <FormikTextField 
                            name="content"
                            label="Content"
                            margin="normal"
                            fullWidth
                        />
                   </Paper>
                   <Paper className={classes.rightSide}>
                       <FormikSelectField 
                            name= "status"
                            label="Status"
                            margin="normal"
                            options={[
                                {label:'unpublished', value: false},
                                {label:'published', value: true}
                            ]}
                            fullWidth
                       />
                       <div className={classes.save}>
                            <Button 
                                variant="contained"  
                                color="secondary"
                                onClick={e=>{
                                    this.props.handleSubmit();
                                }}
                                > <SaveIcon/> Save</Button>
                        </div>
                        {this.props.admin.post.PostImage ?
                            this.props.admin.post.PostImage.length > 0 ?
                                <img src={API.makeFileURL(this.props.admin.post.PostImage[0].url, this.props.auth.token)} className={classes.PostImage}/>
                                :null
                            : null
                            }
                        <div>
                            <Button 
                                variant="contained"  
                                color="primary"
                                onClick={e=>{
                                    $('.MyFile').trigger('click');
                                    console.log('clicked')
                                }}
                            > <ImageIcon/> Upload Image</Button> 
                            <input type="file" style={{display: 'none'}} className="MyFile" onChange={this.uploadImage}/>
                        </div>
                   </Paper>
               </Form>
           </div>

        )
    }
}


const mapStateToProps = state =>{
    return{
        auth: state.auth,
        admin: state.admin
    }

}
const mapDispatchToProps= dispatch=>({
        addPost: (post,token)=>{
            dispatch(AdminActions.addPost(post, token));
        },
        updatePost:(post,token)=>{
            dispatch(AdminActions.updatePost(post,token));
        },
        getSinglePost:(id,token)=>{
            dispatch(AdminActions.getSinglePost(id,token));
        },
        uploadImage:(data,token,postId,userId)=>{
            dispatch(AdminActions.uploadImage(data,token,postId,userId))
        }
});


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: (props)=> ({
        title: props.admin.post.title || '', 
        slug: props.admin.post.slug || '',
        createAt: props.admin.post.createdAt || '',
        status: props.admin.post.status || false,
        content: props.admin.post.content || ''
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        slug: Yup.string().required(),
        content: Yup.string().required()
        
    }),
    handleSubmit: (values, {setSubmitting,props})=> {
        switch(props.match.params.view){
            case 'add':
                return props.addPost(values, props.auth.token);
            case 'edit':
                const post ={ 
                    ...values,
                    id: props.match.params.id
                }
                return props.updatePost(post, props.auth.token);
            default:
                return null;
        }
        
    }

})(withStyles(styles)(AddPost))));