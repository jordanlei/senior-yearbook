import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col, Alert} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';
import Fade from 'react-reveal/Fade';


class WelcomePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.data.isLive){
      var warnactive = 
      <Alert style={{margin: "5%"}} color="danger">
        Note: your profile isn't active, so others can't view 
        your page, but you can still post as a user. <br/>
        To activate, edit your profile in "Profile", and once you're ready, 
        you can activate your account in "Settings".
      </Alert>
    }
    else var warnactive= <div></div>
    return (
        <div className= "dashboard-container" 
        style= {{backgroundImage: "linear-gradient(rgb(0, 0, 0), rgb(12, 26, 66))  " , 
                 paddingTop: "5vh"}}>
        <Row>
          <Col md={2}>
            <DashboardMenu dark displayPanel={this.props.displayPanel}/>
          </Col>
          <Col md={10}>
          <Fade duration={3000}>
            <div style= {{color: "rgba(255, 255, 255, 0.7)", textAlign: "center", paddingTop: "30vh"}}>
            <h1>Welcome, {this.props.data.firstName}.</h1>
            <Fade delay= {500} duration={3000}>
            <h2>This is your dashboard.</h2>
            </Fade>
            {warnactive}
            </div>
          </Fade> 
          </Col>
        </Row>
        </div>  
        
    );
  }
}

export default WelcomePanel;