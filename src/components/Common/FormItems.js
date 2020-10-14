import React , {Component} from 'react';
import {FormikTextField} from 'formik-material-fields';





class FormItems extends Component{
    render(){
        return(
            (this.props.onChange== "createSlug" ?
                <FormikTextField 
                    name={this.props.name}
                    label={this.props.label}
                    margin={this.props.margin}
                    onChange={e => this.props.setFieldValue('slug', e.target.value.toLowerCase().replace(/ /g,'_'))}
                    fullWidth
                />
                :
                <FormikTextField
                    name={this.props.name}
                    label={this.props.label}
                    margin={this.props.margin}
                    fullWidth
                />
                )
           
        )
    }
}


export default FormItems;