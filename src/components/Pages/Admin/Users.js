import React,{Component} from 'react';
import TableView from '../../Common/TableView';
import {connect} from 'react-redux';


const columns =[
    {lable: "ID", name:'id'},
    {lable: "Email", name:'email'},
    {lable: "Name", name:'name'}
]


class Users extends Component{
    render(){
        return(
            <div>
                <h1>User</h1>
                <TableView 
                    columns={columns}
                    rows={[]}
                />
            </div>
            
            
        )
    }

}

export default Users;