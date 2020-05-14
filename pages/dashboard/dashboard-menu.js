import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import {logout} from '../utils/auth';

class DashboardMenu extends Component {
  constructor(props) {
    super(props);
    this.displayPanel = this.displayPanel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  displayPanel(event) {
    this.props.displayPanel(event.target.id);
  }

  handleSubmit(event){
    logout();
  }

  render() {
    var buttonStyle= {color: "rgba(0, 0, 0, 0.8)"}
    if(this.props.dark)
    {
        var buttonStyle= {color: "rgba(255, 255, 255, 0.8)"}
    }
    return (
      <div className="dashboard-menu-container" 
      style= {{marginLeft: "2%", marginTop: "40vh", position: "fixed"}}>
        <ButtonGroup vertical={true} style= {{border: "0px"}}>
          <Button onClick={this.displayPanel} className="menu-item" style= {buttonStyle}>
            <h5 id= "displayWelcome">Welcome</h5>
          </Button>

          <Button onClick={this.displayPanel} className="menu-item" style= {buttonStyle}>
            <h5 id= "displayProfile">Profile</h5>
          </Button>

          <Button onClick={this.displayPanel} className="menu-item" style= {buttonStyle}>
            <h5 id= "displaySettings">Settings</h5>
          </Button>

          <Button className="menu-item" style= {buttonStyle} onClick= {this.handleSubmit}>
            <h5>Logout</h5>
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default DashboardMenu;