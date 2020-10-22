import React, {Component} from 'react';
import Signup from '../Signup';
import Field from '../../Common/Field';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import * as AdminActions from '../../../store/actions/adminActions';
import {withFormik} from 'formik';


const fields =[
    {name: 'email', elementName: 'input', type: 'email', placeholder: 'Admin Email'},
    {name: 'name', elementName: 'input', type: 'text', placeholder: 'Admin Name'},
    {name: 'password', elementName: 'input', type: 'password', placeholder: 'Admin Password'},
    {name: 'password2', elementName: 'input', type: 'password', placeholder: 'Admin Password (again)'}
]

class AddUser extends Component{
    render(){
        return(
            <div>
                <div className="contaainer">
                    <div className="login-form">
                        <div className="row">
                            <h1>Add_New_Admin</h1>
                        </div>
                            <form className="row" onSubmit={e=>{
                                e.preventDefault();
                                this.props.registerAdmin(this.props.values.name, this.props.values.email, this.props.values.password,this.props.auth.token);
                            }}>
                                {fields.map((f,i)=>{
                                    return (
                                        <div className="col-md-12">
                                            <Field 
                                                key={i}
                                                {...f}
                                                value= {this.props.values[f.name]}
                                                name= {f.name}
                                                onChange= {this.props.handleChange}
                                                onBlur={this.props.handleBlur}
                                                touched={(this.props.touched[f.name])}
                                                erros={this.props.errors[f.name]}
                                            />
                                        </div>
                                    )
                                })}
                                <div className="col-md-12">
                                    <p className="text-danger text-center">{this.props.auth.error || ''}</p>
                                    <button className='btn btn-primary text-uppercase'>Sign up</button>
                                </div>
                            </form>
                    </div>
                </div> 
            </div>
        )
    }
}


const mapStateToProps = state=>{
    return{
        auth: state.auth,
        admin: state.admin
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        registerAdmin: ( name, email, pass,token)=>{
            dispatch(AdminActions.registerAdmin(name, email, pass,token));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: ()=>({
        email:'',
        name:'',
        password:'',
        password2:''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, "You must have a longer name").required("We need your name"),
        email: Yup.string().email("Invalide email").required("You must have an email"),
        password: Yup.string().min(6,'Password must have 8 chracters').required("You must enter password"),
        password2: Yup.string().required('Re enter your password').test('pass-match','Passwords are not equal', function(value){
            const {password} = this.parent;
            return password === value;
        })
        
    }),
    handleSubmit: (values, {setSubmitting}, login)=>{
        console.log("Login attempt", values);
        //login(values.email, values.pass);
    }
})
(AddUser));