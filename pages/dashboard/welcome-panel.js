import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';
import Fade from 'react-reveal/Fade';


class WelcomePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className= "dashboard-container" 
        style= {{backgroundImage: "linear-gradient(rgba(16, 34, 88), rgba(2, 4, 11))  " , 
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
            </div>
          </Fade> 
          </Col>
        </Row>
        </div>  
        
    );
  }
}

export default WelcomePanel;