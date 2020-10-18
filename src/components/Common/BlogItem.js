import React, {Component} from 'react';
import API from '../../utils/api';
import {Link} from 'react-router-dom';


class BlogItem extends Component{
    render(){
        return(
            <div className="col-lg-4 col-sm-6 mb-4">
                <div className="portfolio-item">
                    <Link className="portfolio-link" data-toggle="modal" to={`/blog/${this.props.post.slug}`}>
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x"></i></div>
                        </div>
                        {this.props.post.PostImage? 
                            this.props.post.PostImage.length>0 ? 
                                <img style={{width:'100%'}} className="img-fluid" src={API.makeFileURL(this.props.post.PostImage[0].tumbnail, null)} alt="" />
                            :null
                        :null}
                        
                    </Link>
                    <div className="portfolio-caption">
                    <div className="portfolio-caption-heading">{this.props.post.title}</div>
                    <div className="portfolio-caption-subheading text-muted">{this.props.post.slug}</div>
                    </div>
                </div>
            </div>

        )
    }
}
export default BlogItem;