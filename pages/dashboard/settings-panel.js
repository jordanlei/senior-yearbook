import React, { Component } from 'react';
import { Alert, Button, ButtonGroup, Row, Col, 
  Form, FormGroup, Label, Input, Card, Collapse} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';
import Fade from 'react-reveal/Fade';
const bcrypt= require('bcryptjs');

const SALT_WORK_FACTOR = 10

class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state= {
      error: '',

      username: this.props.data.username,
      password: '',  
      firstName: this.props.data.firstName, 
      lastName: this.props.data.lastName, 
      email: this.props.data.email,
      year: this.props.data.year,
      bio: this.props.data.bio, 
      submitted: false,


      isLive: this.props.data.isLive, 
      rSelected: '',

      collapse: false,
      justUpdated: false
    }

    this.handleInputChange= this.handleInputChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.onRadiobtnClick = this.onRadioBtnClick.bind(this)

  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    this.setState({
        [name]: value,
        submitted: false
    });
    switch(name){
        case "password":
            if(value== "password")
            {
                this.setState({error: "Seriously? Your password is password? Try again, fam."})
            }
            else if(value.length < 5)
            {
                this.setState({error: "Try a longer password."})
            }
            else
            {
                this.setState({error: ""})
            }
            break
        case "username":
            if(value.length==0){
                this.setState({error: "Username field cannot be empty."})
            }
            else
            {
                this.setState({error: ""})
            }
            break
    }
  }

  async handleSubmit (event) {
    console.log("updating...")

    var json = {
      username: this.state.username,
      isLive: this.state.isLive, 
    };

    var pass = this.state.password

    if(pass.length > 0){
      console.log("here")
      var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        console.log("here")
        if (err) throw err;
        return salt;  
      })
      var hash = bcrypt.hashSync(pass, salt, function(err, hash){
        if (err) return next(err); 
        return hash})
      json.password = hash;
    } 


    try {
      const response = await fetch(`/api/updateuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })

      if (response.ok) {
        response.json().then(res => 
            {
                this.props.updateData(res)
                this.setState({error: '', submitted: true, justUpdated: false})
            })
      } else {
        // https://github.com/developit/unfetch#caveats
        this.setState({error: "Username is Taken"})
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
    }
  }

  onRadioBtnClick(active) {
      this.setState({isLive: active, submitted: false, justUpdated:true});
  }

  render() {
    var successMessage = <div></div>
    if (this.state.submitted)
    {
      successMessage = <Alert color="success">Successfully updated.</Alert>
    }

    var errorMessage = <div></div>
    if (this.state.error)
    {
      errorMessage = <Alert color="danger">{this.state.error}</Alert>
    }

    var activeMessage= <div></div>
    if (this.state.justUpdated)
    {
      if(this.state.isLive)
      {
        activeMessage = <Alert color="success">Your profile will be live once you save.</Alert>
      }
      else
      {
        activeMessage = <Alert color="danger">Your profile will be deactivated once you save.</Alert>
      }
    }

    return (
        <div className= "dashboard-container" style= {{backgroundImage: "linear-gradient(rgb(0, 0, 0), rgb(12, 26, 66))  " , 
        paddingTop: "5vh"}}>
        <Row>
          <Col md={2}>
            <DashboardMenu dark displayPanel={this.props.displayPanel}/>
          </Col>
          <Col md={10}>
          <Fade duration={3000}>
            <div style= {{color: "rgba(255, 255, 255, 0.7)", textAlign: "center", paddingTop: "15vh"}}>
            <h2>Here are Your Settings.</h2>
            </div>
            <Fade bottom delay= {500} duration={2000}>
            <Card style={{padding:"5%", margin: "5%", marginRight: "20vw", marginLeft: "20vw", backgroundColor: "rgba(255, 255, 255, 0.7)"}}>
            {successMessage}
            {errorMessage}
            <Form>
                    <FormGroup>
                    <Label for="firstName">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        disabled
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="password">Update Password (leave blank if not)</Label>
                    <Input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    </FormGroup>
                    {activeMessage}
                    <ButtonGroup>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(true)} active={this.state.isLive}>Activate</Button>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(false)} active={!this.state.isLive}>Deactivate</Button>                    </ButtonGroup>

                    <div className="center-row" style={{paddingTop: "1em"}}>
                        <Button id="submit" onClick={this.handleSubmit} disabled={this.state.error}>
                                Save
                        </Button>
                    </div>
            </Form>
            </Card>
            </Fade>
          </Fade> 
          </Col>
        </Row>
        </div>  
        
    );
  }
}


export default SettingsPanel;