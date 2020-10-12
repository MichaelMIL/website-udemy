import React,{Component} from 'react';
import './assets/css/admin.css';


class LooginWrapper extends Component{
    render(){
        return(
            <div id="admin-page">

                {this.props.children}
            </div>
        )
    }
}


export default LooginWrapper;