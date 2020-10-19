import React,{Component} from 'react';
import TableView from '../../Common/TableView';
import {connect} from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
//import Link from '@material-ui/core/Link';


const columns =[
    {lable: "ID", name:'id'},
    {lable: "Title", name:'title'}
]


const styles = theme=>({
    fab: {
        position: 'fixed',
        bottom: '50px',
        right: '50px'
    }
})

class Posts extends Component{

    componentDidMount(){
        this.props.getPosts(this.props.auth.token)
    }   

    render(){
        const posts = this.props.admin.posts;
        console.log(posts)
        const {classes} = this.props;
        return(
            <div>
                <h1>Post</h1>
                <TableView 
                    columns={columns}
                    rows={posts}
                />
                <Fab component={RouterLink} to="/admin/posts/add" color="secondary"  aria-label="Add" className={classes.fab}>
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
    getPosts: (token)=>{
        dispatch(AdminActions.getPosts(token));
    }
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Posts));