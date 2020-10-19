import React, {Component} from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions';

const fields =[
    {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your Email'},
    {name: 'name', elementName: 'input', type: 'text', placeholder: 'Your Name'},
    {name: 'password', elementName: 'input', type: 'password', placeholder: 'Your Password'},
    {name: 'password2', elementName: 'input', type: 'password', placeholder: 'Your Password (again)'}
]

class Signup extends Component{
    render(){
        return(
            <div className="login-page">
                <div className="contaainer">
                    <div className="login-form">
                        <div className="row">
                            <h1>Sign-Up</h1>
                        </div>
                            <form className="row" onSubmit={e=>{
                                e.preventDefault();
                                this.props.register(this.props.values.name, this.props.values.email, this.props.values.password);
                            }}>
                                {fields.map((f,i)=>{
                                    return (
                                        <div className="col-md-6">
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
        );
    };
}

const mapStateToProps = state=>{
    return{
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        register: (name, email, pass)=>{
            dispatch(AuthActions.register(name, email,pass));
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
(Signup));