import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import {Link} from 'react-router-dom';
import SidebarItem from './SidebarItem';

//icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import FaceIcon from '@material-ui/icons/Face';
import ForumIcon from '@material-ui/icons/Forum';


const sidebarItems = [
    {name: "Dashboard", icon: DashboardIcon, link: "/admin"},
    {name: "Posts", icon: ForumIcon, link: "/admin/posts"},
    {name: "Users", icon: FaceIcon, link: "/admin/users"}
]

class Sidebar extends Component{
    render(){
        return(

            <List>
                {sidebarItems.map((item, index)=>{
                return <SidebarItem {... item} key={index}/>
                })}                       
            </List>

        )
    }
}

export default Sidebar;