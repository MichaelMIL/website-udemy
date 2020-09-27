import React, { Component } from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import * as Yup from 'yup';


const fields= {
    sections: [
        [
            {name: 'name', elementName: 'input', type: 'text', placeholder: 'Your Name *'},
            {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your Email *'},
            {name: 'phone', elementName: 'input', type: 'text', placeholder: 'Your Phone *'}
        ],
        [
            {name: 'message', elementName: 'textArea', type: 'text', placeholder: 'Your Message *'}
        ]
    ]
    
}

class Contact extends Component {

    render(){
        return(
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <form onSubmit={this.props.handleSubmit} name="sentMessage" noValidate="novalidate">
                        <div className="row align-items-stretch mb-5">

                        {fields.sections.map((section, sectionIndex)=>{
                            console.log("rendering section:", sectionIndex, "with=>", section);
                            return(
                                <div className="col-md-6" key={sectionIndex}>
                                    {section.map((field, i)=>{
                                        return(
                                            <Field {... field} 
                                            key={i}
                                            value={this.props.values[field.name]}
                                            name={field.name}
                                            onChange={this.props.handleChange}
                                            onBlur={this.props.handleBlur}
                                            touched={this.props.touched[field.name]}
                                            erros={this.props.errors[field.name]}
                                             />
                                        )

                                    })}
                                </div>
                            )
                        })}
                        </div>
                        <div className="text-center">
                            <div id="success"></div>
                            <button className="btn btn-primary btn-xl text-uppercase" id="sendMessageButton" type="submit"
                            >Send Message</button>
                        </div>
                    </form>
                </div>
        </section>
        )
    }
}

export default withFormik({
    mapPropsToValues: ()=> ({
        name: '', 
        email: '',
        phone: '',
        message: ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(3,"Hey! thats too short!")
            .required('You must give a name')
        ,

        email: Yup.string()
            .email("Thats not true... :(")
            .required('Give me your email!')
        ,

        phone: Yup.string()
            .min(10, "To short....")
            .max(15, "Thants not nice")
            .required("Can I ask you for your number?????")
        ,

        message: Yup.string()
            .min(500,"Give me more informatiooooon")
            .required("You have to send me somthimg...")

    }),

    handleSubmit: (values, {setSubmitting})=> {
        console.log("values:", values);
        alert("the form has been submitted", JSON.stringify(values));
    }

})(Contact);