import React, {Component} from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions';

const fields =[
    {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your Email'},
    {name: 'passord', elementName: 'input', type: 'password', placeholder: 'Your Password'}
]

class Login extends Component{
    render(){
        return(
            <div className="login-page">
                <div className="contaainer">
                    <div className="login-form">
                        <div className="row">
                            <h1>Login</h1>
                        </div>
                        <div className="row">
                            <form onSubmit={this.props.handleSubmit}>
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
                                    <button className='btn btn-primary text-uppercase'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state=>{
    return{
        auth:state.auth
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        login: (email, pass)=>{
            dispatch(AuthActions.login(email,pass));
        }
    }
};

export default connect(withFormik({
    mapPropsToValues: ()=>({
        email:'',
        password:''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
        .email("Invalide email")
        .required("You must have an email")
        ,
        password: Yup.string().required("Ypu must enter password")
        
    }),
    handleSubmit: (values, {setSubmitting})=>{
        console.log("Login attempt", values);
    }
}))(Login);