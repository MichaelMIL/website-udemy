import React, {Component} from 'react';
import {connect} from 'react-redux';
import API from '../../utils/api';
import Header from '../Common/Header';
import image from '../assets/img/About.jpg';
import * as SiteActions from '../../store/actions/siteActions';
import {Link} from 'react-router-dom';
import CommentBuilder from '../Common/CommentBuilder';

class Single extends Component{

    componentDidMount(){
        this.props.getSinglePost(this.props.match.params.slug, this.props.auth.token);
    
    }

    render(){
        return(
        <div>
            <Header 
                title ={this.props.site.post.createAt}
                subtitle ={this.props.site.post.title}
                showButton = {false}
                image={
                    this.props.site.post.PostImage ?
                        this.props.site.post.PostImage.length >0 ?
                            API.makeFileURL(this.props.site.post.PostImage[0].url,this.props.auth.token)
                        : image
                    : image
                }
            />
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="post-content" dangerouslySetInnerHTML={{__html: this.props.site.post.content}}></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Comments</h3>
                        {this.props.auth.token?
                            <CommentBuilder/>

                        :
                            <div className="col-md-12">
                                <p>Need an account? <Link to="/signup">Sign Up</Link></p>
                                <p>Have an account? <Link to="/login">Log In</Link></p>
                            </div>
                        }
                    </div>
                </div>
                <div className="row">
                    {this.props.site.post.Comments? 
                        this.props.site.post.Comments.length >0 ?
                            this.props.site.post.Comments.map((comment, i)=>{
                                return(
                                    <div className="col-md-12">
                                        <h4>{comment.Profile ? comment.Profile.name :'' }</h4>
                                        <h10 className="section-subheading text-muted">{comment.createdAt}</h10>
                                        <p>{comment.content}</p>
                                    </div>
                                )
                            })
                            :null
                        :null
                    }
                </div>
            </div>
        </div>
        )
    }

}

const mapStateToProps = state=>({
    auth: state.auth,
    site: state.site,
})

const mapDispatchToProps = dispatch=>({
    getSinglePost: (slug,token)=>{
        dispatch(SiteActions.getPostBySlug(slug, token));
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Single);