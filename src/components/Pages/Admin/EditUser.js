import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import {withFormik, Form} from 'formik';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import {FormikTextField, FormikCheckboxField} from 'formik-material-fields';
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
    },
    save:{
        marginBottom: theme.spacing.unit *2
    }
});



class EditUser extends Component{

    componentDidUpdate(props,state){
        if(this.props.match.params.view ==='add' && this.props.admin.users.filter(p => p.name === this.props.values.name).length > 0){
            const user = this.props.admin.users.filter(p=> p.name === this.props.values.name)[0];
            this.props.history.push('/admin/users/edit/'+user.dispatch);
        }

        if(this.props.admin.user.id !== props.admin.user.id){
            // when redux state changes post in admin reducer
            this.props.setValues(this.props.admin.user);
        }
    }

    componentDidMount(props, state){
        if(this.props.match.params.view === 'edit' && this.props.match.params.id){
            this.props.getUserById(this.props.match.params.id, this.props.auth.token)
        }
    }

    
    render(){
        const {classes} = this.props;
        return(
           <div>
               <h1>Add User</h1>
               
               <Form  className={classes.container} >
                    <Paper className={classes.leftSide}>
                            {/* {formItems.map((item, index)=>{
                                return <FormItems {... item} key={index}/>
                            })}   */}

                        <FormikTextField 
                            name="name"
                            label="Name"
                            margin="normal"
                            fullWidth
                        />
                        <FormikTextField 
                            name="email"
                            label="Email"
                            margin="normal"
                            fullWidth
                       />
                        <FormikTextField 
                            name="emailVal"
                            label="Re enter your Email"
                            margin="normal"
                            fullWidth
                       />
                        <FormikTextField 
                            name="password"
                            label="Password"
                            margin="normal"
                            fullWidth
                            type="password"
                        />
                        <FormikTextField 
                            name="passwordVal"
                            label="Re enter your Password"
                            margin="normal"
                            fullWidth
                            type="password"
                       />

                    </Paper>
                    <Paper className={classes.rightSide}>
                        <FormikCheckboxField
                            name="isAdmin"
                            margin="normal"
                            trueValue={true}
                            falseValue= {false}
                            controlLabel="Admin"
                        />
                        <div className={classes.save}>
                            <Button 
                                variant="contained"  
                                color="secondary"
                                onClick={e=>{
                                    this.props.setFieldValue('createAt', new Date().toLocaleString('he-il'));
                                    this.props.handleSubmit();
                                }}
                                > <SaveIcon/> Save</Button>
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
        // addUser: (post,token)=>{
        //     dispatch(AdminActions.addUser(post, token));
        // },
        updateUser:(user,token)=>{
            dispatch(AdminActions.updateUser(user,token));
        },
        getUserById:(id,token)=>{
            dispatch(AdminActions.getUserById(id,token));
        },
        setAdmin: (token, userId)=>{
            dispatch(AdminActions.setAdmin(token, userId));
        }
});


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: (props)=> ({
        name: props.admin.user.name || '', 
        email: props.admin.user.email || '',
        emailVal: '',
        createAt: props.admin.user.createdAt || '',
        isAdmin: "props.values.isAdmin "|| false,
        password: '',
        passwordVal: '',
        
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, "You must have a longer name").required("We need your name"),
        email: Yup.string().email("Invalide email").required("You must have an email"),
        emailVal:Yup.string().required('Re enter your Email').test('match','Emails are not equal', function(value){
            const {email} = this.parent;
            return email === value;
        }),
        password: Yup.string().min(6,'Password must have 8 chracters').required("You must enter password"),
        passwordVal: Yup.string().required('Re enter your password').test('pass-match','Passwords are not equal', function(value){
            const {password} = this.parent;
            return password === value;
        })
        

        
    }),
    handleSubmit: (values, {setSubmitting,props})=> {
        switch(props.match.params.view){
            case 'add':
                if(values.isAdmin) props.setAdmin(props.auth.token, props.admin.user.id);
                return props.registerAdmin(values.name, values.email, values.password);
            case 'edit':
                const user ={ 
                    ...values,
                    id: props.match.params.id
                }
                console.log("edit", props.admin.user.id)
                if(values.isAdmin) props.setAdmin(props.auth.token, props.admin.user.id);
                return props.updateUser(user, props.auth.token);
            default:
                return null;
        }
        
    }

})(withStyles(styles)(EditUser))));