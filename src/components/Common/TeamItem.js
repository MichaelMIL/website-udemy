import React , {Component} from 'react';
import {Link} from 'react-router-dom';

class TeamItem extends Component{
    render(){
        return(
            <div className="col-lg-4">
            <div className="team-member">
                <img className="mx-auto rounded-circle" src={this.props.image} alt="" />
                <h4>{this.props.name}</h4>
                <p className="text-muted">{this.props.job}</p>
                <Link className="btn btn-dark btn-social mx-2" to={this.props.twitter}><i className="fab fa-twitter"></i></Link>
                <Link className="btn btn-dark btn-social mx-2" to={this.props.facebook}><i className="fab fa-facebook-f"></i></Link>
                <Link className="btn btn-dark btn-social mx-2" to={this.props.linkedin}><i className="fab fa-linkedin-in"></i></Link>
            </div>
        </div>
        )
    }
}
export default TeamItem;