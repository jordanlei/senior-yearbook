import React, { Component } from 'react';
import { Alert, Button, ButtonGroup, Row, Col, 
  Form, FormGroup, Label, Input, Card, Collapse} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';
import Fade from 'react-reveal/Fade';

class ProfilePanel extends Component {
  constructor(props) {
    super(props);
    this.state= {
      error: '',

      username: this.props.data.username,
      password: this.props.data.password, 
      firstName: this.props.data.firstName, 
      lastName: this.props.data.lastName, 
      email: this.props.data.email,
      bio: this.props.data.bio, 
      school: this.props.data.school,
      submitted: false,
      avatar: this.props.data.avatar,
      isLive: this.props.data.isLive, 
      collapse: false
    }

    this.handleInputChange= this.handleInputChange.bind(this)
    this.handleMultiInputChange = this.handleMultiInputChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.toggle= this.toggle.bind(this)
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
        case "year":
            var year= new Date().getFullYear() + 4
            if(value > year)
            {
                this.setState({error: "Please choose a valid year."}) 
            }
            else
            {
                this.setState({error: ""})
            }
            break
        case "firstName":
            if(value.length==0){
                this.setState({error: "First name field cannot be empty."})
            }
            else
            {
                this.setState({error: ""})
            }
            break
        case "lastName":
            if(value.length==0){
                this.setState({error: "Last name field cannot be empty."})
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
        case "email":
            if(value.length==0){
                this.setState({error: "Email field cannot be empty."})
            }
            else if (!(value.includes("@")))
            {
                this.setState({error: "Please enter a valid email."})
            }
            else
            {
                this.setState({error: ""})
            }
            break
        case "bio":
          if(value.length>300){
              this.setState({error: "Blurb exceeds max length (300 characters). Count: " + value.length})
              this.setState({description1error: "Description exceeds max length (300 characters). Count: " + value.length})
          }
          else
          {
              this.setState({error: ""})
              this.setState({description1error: ""})
          }
          break
    }
  }


  handleMultiInputChange(event){
    const options= event.target.options; 
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    value.sort()
    this.setState({industries: value})
  }
  

  async handleSubmit (event) {
    console.log("updating...")

    var json = {
      username: this.state.username,
      password: this.state.password, 
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      email: this.state.email,
      bio: this.state.bio,
      school: this.state.school,
      avatar: this.state.avatar,
      isLive: this.state.isLive
    };

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
                this.setState({error: '', submitted: true})
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

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    var activeMessage= <div></div>
    if(!this.state.isLive)
    {
      activeMessage= <Alert color= 'danger'>Your profile isn't live. You can change this in Settings.</Alert>
    }

    var errorMessage= <div></div>
    if(this.state.error)
    {
        console.log("error")
        errorMessage= <Alert color= 'danger'>{this.state.error}</Alert>
    }

    var saveSuccess= <div></div>
    if(this.state.submitted)
    {
        saveSuccess= <Alert color= 'success'>Successfully Updated Profile.</Alert>
    }

    var cardStyle={
      width:"25em", 
      marginTop: "10vh", 
      marginLeft: "5%", 
      marginRight: "5%",
      marginBottom: "10vh",
      backgroundColor: "rgba(0, 0, 0, 0.7)", 
      color: "rgba(255, 255, 255, 0.9)"
    }

    
    var state= this.state

    var imageStyle=
      {backgroundImage: "url("+ state.avatar +")", 
        width: "12em", 
        height: "12em", 
        margin: "0 auto",
        backgroundPosition:"center",
        backgroundSize:"cover",
        marginBottom: "1em",
      }

    var avatar= <div></div>
    if(state.avatar)
    {
      avatar= <Card style={imageStyle}></Card>
    }

    if (state.bio)
    {
      var bio = 
      <h5>
        <br/>
          <b>"</b>{state.bio}<b>"</b><br/>
        <br/>
      </h5>
    }
    else var bio = <div></div>

    if(state.school)
    {
      var school= <p style={{color: "rgba(255, 255, 255, 0.5)"}}>{state.school}</p>
    }
    else var school= <div></div>
    



    var cardContent= 
    (<div style={{padding: "10%"}}>
      {avatar}
      <div style={{textAlign: "center"}}>
      <h4>{state.firstName} {state.lastName}</h4>
      {school}
      {bio}
      </div>
      
      {/* <Button outline color="secondary" block onClick= {this.toggle}>See More</Button> */}
    </div>)

    return (
      <div className= "dashboard-container" style= {{backgroundImage: "linear-gradient(rgb(0, 0, 0), rgb(12, 26, 66))  " , 
      paddingTop: "5vh"}}>
      <Row>
        <Col md={2}>
          <DashboardMenu dark displayPanel={this.props.displayPanel}/>
        </Col>
        <Col md={5}>
        <Fade duration={3000}>
          <div style= {{color: "rgba(255, 255, 255, 0.7)", paddingTop: "10vh"}}>
          <h2 style= {{textAlign: "center"}}>This is Your Profile.</h2>

          <Form style={{paddingLeft: "5%", paddingRight:"5%", paddingTop: "2em", paddingBottom: "10%"}}>
                    
                    <h4 style={{textAlign: "center", paddingTop: "1em"}}>General Information</h4>
                    {errorMessage}
                    {saveSuccess}
                    <Row>
                        <Col md={6}>
                        <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                            type="text"
                            id="firstName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                        />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                        <Label for="lastName">Last Name </Label>
                        <Input
                            type="text"
                            id="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                        />
                        </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="email">Email (can be non-.edu)</Label>
                        <Input
                            type="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="school">University<br/></Label>
                        <Input
                            type="text"
                            id="school"
                            value={this.state.school}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="avatar">Profile Photo Url <br/> 
                          To get a photo url, right-click on an image and select 
                          "Open Image in New Tab". Then copy the url and paste it here. 
                          This can be done for most Facebook images. Alternatively, 
                          upload your image to Imgur, and do the same process.
                        </Label>
                        <Input
                            type="text"
                            id="avatar"
                            value={this.state.avatar}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="bio">Blurb</Label>
                        <Input
                            style={{minHeight: "5em", textAlign: "center"}}
                            type="textarea"
                            id="bio"
                            value={this.state.bio}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>

                    <div className="center-row" id="submit">
                        <Button id="submit" style= {{marginBottom: "2em"}} onClick={this.handleSubmit} disabled={this.state.error}>
                                Save
                        </Button>
                    </div>
                </Form>
          </div>
        </Fade>
        </Col>
        <Col md={5}>

          <div style={{position: "fixed", width: "100%", overflowY: "scroll", overflowX:"hidden", height:"100vh"}}>
          <Fade bottom>
          <Card style={cardStyle}>
            {activeMessage}
            {cardContent}
          </Card>
          </Fade>
          </div>
          
        </Col>
      </Row>
      </div>
    );
  }
}


export default ProfilePanel;