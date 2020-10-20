import React, { Component } from 'react';
import PageWrapper from './components/PageWrapper';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import {connect} from 'react-redux';

//Pages
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Login from './components/Pages/Login';
import Blog from './components/Pages/Blog';
import Single from './components/Pages/Single';
import Signup from './components/Pages/Signup';

//admin pages
import Dashboard from './components/Pages/Admin/Dashboard';
import Users from './components/Pages/Admin/Users';
import Posts from './components/Pages/Admin/Posts';
import AddPost from './components/Pages/Admin/AddPost';
import AddUser from './components/Pages/Admin/AddUser';
import LoginAdmin from './components/Pages/Admin/LoginAdmin';

import AdminWrapper from './components/AdminWrapper';
import LoginWrapper from './components/LoginWrapper';


class App extends Component{
  render(){
    return (
      <Router>

        <Route 
          path="/admin/user/:view/:id"
          render= {props=>{
            console.log("props: ", props);
            return(

              <div>            
                {this.props.auth.token ?
                  <AdminWrapper>
                    <AddUser/>
                  </AdminWrapper>
                  : 
                  <LoginWrapper>
                    <LoginAdmin/>
                  </LoginWrapper>
                }

              </div>
           
            )
          }
        }
        />
        <Route 
          exact = {true}
          path="/admin/users/:view"
          render= {props=>{
            console.log("props: ", props);
            return(

              <div>            
                {this.props.auth.token ?
                  <AdminWrapper>
                    <AddUser/>
                  </AdminWrapper>
                  : 
                  <LoginWrapper>
                    <LoginAdmin/>
                  </LoginWrapper>
                }

              </div>
           
            )
          }
        }
        />

        <Route 
          exact = {true}
          path="/admin/users"
          render= {props=>{
            console.log("props: ", props);
            return(

              <div>            
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Users/>
                  </AdminWrapper>
                  : 
                  <LoginWrapper>
                    <LoginAdmin/>
                  </LoginWrapper>
                }

              </div>
           
            )
          }
        }
        />
        <Route 

          path="/admin/posts/:view/:id"
          render= {props=>{
            console.log("props: ", props);
            return(

              <div>            
                {this.props.auth.token ?
                  <AdminWrapper>
                    <AddPost/>
                  </AdminWrapper>
                  : 
                  <LoginWrapper>
                    <LoginAdmin/>
                  </LoginWrapper>
                }

              </div>
           
            )
          }
        }
        />
        <Route 
          exact = {true}
          path="/admin/posts/:view"
          render= {props=>{
            console.log("props: ", props);
            return(

              <div>            
                {this.props.auth.token ?
                  <AdminWrapper>
                    <AddPost/>
                  </AdminWrapper>
                  : 
                  <LoginWrapper>
                    <LoginAdmin/>
                  </LoginWrapper>
                }

              </div>
           
            )
          }
        }
        />

        
        <Route 
          exact = {true}
          path="/admin/posts"
          render= {props=>{
            console.log("props: ", props);
            return(

              <div>            
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Posts/>
                  </AdminWrapper>
                  : 
                  <LoginWrapper>
                    <LoginAdmin/>
                  </LoginWrapper>
                }

              </div>
           
            )
          }
        }
        />

        <Route 
            exact = {true}
            path= "/signup"
            render= {props=>{
              if(this.props.auth.token){
                return(
                  <Redirect to="/" />
                )
              }else{
                return(
                  <LoginWrapper>
                      <Signup/>
                  </LoginWrapper>
                 )}
            }}

        />

        <Route 
            exact = {true}
            path= "/login"
            render= {props=>{
              if(this.props.auth.token){
                return(
                  <Redirect to="/" />
                )
              }else{
                return(
                  <LoginWrapper>
                      <Login/>
                  </LoginWrapper>
                 )}
            }}

        />

        <Route 
          exact = {true}
          path= "/admin"
          render= {props=>{
            console.log("props: ", props);
            return(

              <div>            
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Dashboard/>
                  </AdminWrapper>
                  : 
                  <LoginWrapper>
                    <LoginAdmin/>
                  </LoginWrapper>
                }

              </div>
           
            )
          }
        }
            
        />

            <Route
              exact = {true}
              path="/"
              render= {props=>(
                <PageWrapper>
                  <Home {...props} />
                </PageWrapper>
              )}
            />

            <Route
              path="/blog/:slug"
              render= {props=>(
                <PageWrapper>
                  <Single {...props} />
                </PageWrapper>
              )}
            />
            
            <Route
              exact={true}
              path="/blog"
              render= {props=>(
                <PageWrapper>
                  <Blog {...props} />
                </PageWrapper>
              )}
            />

            <Route
              path="/about"
              render= {props=>(
                <PageWrapper>
                  <About {...props} />
                </PageWrapper>
              )}
            />

            <Route 
              path="/contact"
              render= {props=>(
                <PageWrapper>
                  <Contact {...props} />
                </PageWrapper>
              )}
            />

      </Router>
    );
  }
}

const mapStateToProps= state => {
  return{
   auth: state.auth
  }
}

const mapDispatchToProps= dispatch=>{
  return{

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
