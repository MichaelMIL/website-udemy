import React , {Component} from 'react';
import Header from '../Common/Header';
import image from '../assets/img/header-bg.jpg';
import TimeLine from '../Common/TimeLine';
import Team from '../Common/Team';


//Re-Useable componenets
import Services from '../Common/Services';
import Protfolio from '../Common/Protfolio';

class Home extends Component {
    render () {
        return(
            <div>
                <Header 
                    title ="Welcome To Our Studio!"
                    subtitle = "IT'S NICE TO MEET YOU"
                    buttonText = " Tell me more"
                    link = "/services"
                    showButton = {true}
                    image={image}
                />
                <Services/>
                <Protfolio />
                <TimeLine />
                <Team />
            </div>
        )
    }

}

export default Home;