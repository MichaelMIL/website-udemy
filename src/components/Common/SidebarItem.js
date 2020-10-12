import React , {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


function ListItemLink(props){
    return <ListItem button component={RouterLink} {...props}/>;
}

class SidebarItem extends Component{
    render(){
        const CustomTag = this.props.icon;
        return(
            <ListItemLink button to={this.props.link}>
                    <ListItemIcon>
                        <CustomTag />
                    </ListItemIcon>
                    <ListItemText primary={this.props.name}/>
            </ListItemLink>
        )
    }
}
export default SidebarItem;


