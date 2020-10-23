import React, {Component} from 'react';
import { Link }  from 'react-router-dom';
import {connect} from 'react-redux';
import * as AuthActions from '../store/actions/authActions';

class PageWrapper extends Component{
    
    render(){
        return(
            <div>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <Link className="navbar-brand js-scroll-trigger" to="/"><img src="assets/img/navbar-logo.svg" alt="" /></Link >
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars ml-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ml-auto">
                        <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/blog">Blog</Link ></li>
                        <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/services">Services</Link ></li>
                        <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/portfolio">Portfolio</Link ></li>
                        <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/about">About</Link ></li>
                        <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/team">Team</Link ></li>
                        <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/contact">Contact</Link ></li>
                        {!this.props.children._self.props.auth.token ? 
                            <div className="navbar-nav text-uppercase ml-auto">
                                <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/signup">Sign up</Link ></li>
                                <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/login">login</Link ></li>
                            </div>
                        : 
                        this.props.children._self.props.auth.profile?
                            <div className="navbar-nav text-uppercase ml-auto">
                                <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/">{this.props.children._self.props.auth.profile.name}</Link ></li>
                                <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/" onClick={e=>{
                                this.props.logout(this.props.auth.token);
                            }}>logout</Link ></li>
                            </div>
                            : 
                            <div className="navbar-nav text-uppercase ml-auto">
                            <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/" onClick={e=>{
                                this.props.logout(this.props.auth.token);
                            }}>logout</Link ></li>
                        </div>
                        }
                    </ul>
                </div>
            </div>
        </nav>

        {this.props.children}
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
        logout:(token)=>{
            dispatch(AuthActions.logout(token))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageWrapper);


