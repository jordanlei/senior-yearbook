import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import SimpleTitle from './components/SimpleTitle';
import { Form, FormGroup, Label, Input, Button, Alert, FormText, Row, Col } from 'reactstrap';
import Layout from './components/Layout';
import StyleDiv from './components/StyleDiv';
import { login } from './utils/auth'
import Fade from 'react-reveal/Fade'

class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
    username: '',
    password: '',
    error: '',
    submitted: false
    };

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

    handleInputChange(event) {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    this.setState({
        [name]: value,
    });
    }

  async handleSubmit (event) {
    event.preventDefault()
    const username = this.state.username
    const password = this.state.password

    try {
      const response = await fetch('/api/authuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username , password })
      })

      if (response.ok) {
        response.json().then(res => 
            {
              const token= this.state.username
              console.log("Signing in")
              login(token)
            })
      } else {
        // https://github.com/developit/unfetch#caveats
        this.setState({error: "Incorrect Username or Password"})
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
    }
  }

  render () {
    var errorMessage= <div></div>
    if(this.state.error)
    {
        errorMessage= <Alert color='danger'>{this.state.error}</Alert>
    }

    const titleStyle= {
      textAlign: 'center', 
      minHeight: "100vh", 
      backgroundImage: "linear-gradient(rgba(16, 34, 88), rgba(4, 8, 22))  " , 
      color: "rgba(255, 255, 255, 0.9)",
      backgroundAttachment: "fixed",     
      backgroundSize: "cover"
    }

    return (
      <div style={titleStyle}>
        <Layout>
        <SimpleTitle>
          <div style={{paddingTop: "10vh", width: "50vw", margin:"0 auto"}}>
          <Fade bottom duration={3000}>
            <h3>Let's Get You Logged In.<br/><br/></h3>
          </Fade>
          </div>
        </SimpleTitle>
        <div style={{minHeight: "60vh"}}>
        <StyleDiv>
        <Fade bottom duration={2000} delay={500}>
            <Form style={{paddingLeft: "20%", paddingRight:"20%"}}>
                {errorMessage}
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>

                <div className="center-row" id="submit">
                    <Button id="submit" onClick={this.handleSubmit}>
                            Submit
                    </Button>
                </div>
            </Form>
        </Fade>
        </StyleDiv>
        </div>
        </Layout>
        </div>
    )
  }
}

export default Login