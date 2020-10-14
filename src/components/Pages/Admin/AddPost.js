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
//import FormItems from '../../Common/FormItems';

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
                       <Button 
                            variant="contained"  
                            color="secondary"
                            onClick={e=>{
                                this.props.handleSubmit();
                            }}
                            > <SaveIcon/> Save</Button>
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
const mapDispatchToProps= dispatch=>{
  return{
        addPost: (post,token)=>{
            dispatch(AdminActions.addPost(post, token));
        }
    }
  }

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: ()=> ({
        title: '', 
        slug: '',
        createAt: '',
        status: false,
        cintent: ''
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        slug: Yup.string().required(),
        content: Yup.string().required()
        
    }),
    handleSubmit: (values, {setSubmitting,props})=> {
        console.log('saving', props.addPost);
        props.addPost(values, props.auth.token);
    }

})(withStyles(styles)(AddPost))));