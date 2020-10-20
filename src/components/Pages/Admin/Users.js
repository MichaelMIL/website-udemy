import React,{Component} from 'react';
import TableView from '../../Common/TableView';
import {connect} from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';


const columns =[
    {lable: "ID", name:'id'},
    {lable: "Email", name:'email'},
    {lable: "Name", name:'name'}
]
const styles = theme=>({
    fab: {
        position: 'fixed',
        bottom: '50px',
        right: '50px'
    }
})

class Users extends Component{

    componentDidMount(){
        this.props.getUsers(this.props.auth.token)
    }

    render(){
        const users = this.props.admin.users;
        const {classes} = this.props;
        return(
            <div>
                <h1>User</h1>
                <TableView 
                    columns={columns}
                    rows={users}
                    type= 'admin'
                />
                <Fab component={RouterLink} to="/admin/users/add" color="secondary"  aria-label="Add" className={classes.fab}>
                    <EditIcon/>
                </Fab>
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
    getUsers: (token)=>{
        dispatch(AdminActions.getUsers(token));
    }
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Users));