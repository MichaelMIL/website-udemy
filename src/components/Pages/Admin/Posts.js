import React,{Component} from 'react';
import TableView from '../../Common/TableView';
import {connect} from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';


const columns =[
    {lable: "ID", name:'id'},
    {lable: "Title", name:'title'}
]


class Posts extends Component{

    componentDidMount(){
        this.props.getPosts(this.props.auth.token)
    }   

    render(){
        const posts = this.props.admin.posts;
        return(
            <div>
                <h1>Post</h1>
                <TableView 
                    columns={columns}
                    rows={posts}
                />
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
)(Posts);