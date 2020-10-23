import React,{Component} from 'react';
import './assets/css/admin.css';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as AdminActions from '../store/actions/adminActions';

import Sidebar from './Common/Sidebar';

//material-ui
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';



//Drawer imports
import Drawer from '@material-ui/core/Drawer';
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';


import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 240;
const styles = theme =>({
    root:{
        display: 'flex'
    },
    appBarSpace: theme.mixins.toolbar,
    toolbar:{
        paddindRight: 24
    },
    appBar:{
        zIndex: theme.zIndex.drawer +1,
        transition: theme.transitions.create(['width', 'margin'],{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift:{
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'],{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    toolbarIcon:{
        display: 'flex',
        alignItems: 'center',
        justifyContent:'flex-end',
        padding:'0 8px',
        ...theme.mixins.toolbar
    },
    drawerPaper:{
        position: 'relative',
        whiteSpace: 'noWrap',
        width: drawerWidth,
        transition: theme.transitions.create('width',{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose:{
        overflowX: 'hidden',
        width: theme.spacing.unit *7,
        transition: theme.transitions.create('width',{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    content:{
        flexGrow: 1,
        padding: theme.spacing.units *3,
        hight: '100vh',
        overflow: 'auto'
    }
});
function ListItemLink(props){
    return <ListItem button component={RouterLink} {...props}/>;
}

class AdminWrapper extends Component{

    constructor(props){
        super(props);

        this.state = {
            open: true
        };
    };

    handleDrawerOpen = (e)=>{
        this.setState({open:true})
    };

    handleDrawerClose= (e)=>{
        this.setState({open:false})
    };

    render(){
        const {classes}= this.props;
        const CustomTag = ExitToAppIcon;
        return(
            <div id="admin-page" className={classes.root}>

                <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        {this.state.open ?
                       null 
                    :
                    <IconButton>
                            <MenuIcon onClick = {this.handleDrawerOpen}/>
                        </IconButton>
                    
                    }
                        
                        <Typography 
                            component='h1'
                            variant="h6"
                            color="inherit"
                            noWrap
                        >Admin</Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    classes= {{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
                    }}
                    variant="permanent"
                    open={true}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick = {this.handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <Sidebar />
                        <ListItemLink onClick={e=>{
                                this.props.logoutAdmin(this.props.auth.token);
                            }}>
                                <ListItemIcon>
                                        <CustomTag />
                                </ListItemIcon>
                                <ListItemText primary="Logout"/>
                        </ListItemLink>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpace} />
                       {this.props.children} 
                    </main>

                
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        logoutAdmin:(token)=>{
            dispatch(AdminActions.logoutAdmin(token))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AdminWrapper));