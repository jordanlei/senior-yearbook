import Link from 'next/link'
import React, {Component} from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import ClassUsers from '../class-users';
import cookie from 'js-cookie';
import {logout} from '../utils/auth';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  
const linkStyle = {
  marginRight: 15
}

class Header extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  async componentDidMount() {
    //if the user is logged in ...
    if(cookie.get('token')){
        const response = await fetch('/api/finduser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: cookie.get('token')})})
        if (response.ok){
            if (cookie.get('token') == this.props.name)
            {
                this.setState({isOwn: true})
            }
            response.json().then(data => {
                this.setState({data: data})
                this.setState({userLoggedIn: true})
            })
        }
        else{
            this.setState({userError: "User Not Found"})
        }
    }
    else
    {
        this.setState({userLoggedIn: false})
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubmit(event){
    logout();
  }


  render(){
    
    var headerStyle={position: "fixed", 
    width: "100vw", 
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))",
    zIndex:"2"
    }

    var backgroundColor = "rgba(0, 0, 0, 0.5)"
    if(this.props.light)
    {
      headerStyle.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))"
      backgroundColor= "rgba(255, 255, 255, 0.5)"
    }

    if (this.state.data)
    {
      return(
        <div style= {headerStyle}>
        <Navbar light= {this.props.light} dark= {!this.props.light} expand="md" style= {{paddingLeft: "3%", paddingRight: "3%"}}>
          <NavbarBrand href="/"><img src="/gradcap-dark.png" style={{width:"100px"}}></img></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="/classof/2020"><p>2020</p></NavLink>
              </NavItem>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="../about"><p>About</p></NavLink>
              </NavItem>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="../how"><p>How This Works</p></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
               <p><DropdownToggle nav caret style={{marginRight: "10px"}}>
               {this.state.data.firstName}
                </DropdownToggle></p>
                <DropdownMenu className= "dropdown" right style= {{backgroundColor: backgroundColor, marginTop: "7px"}}>
                  <DropdownItem>
                    <NavLink href="../profile">Dashboard</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button color= "secondary"  onClick= {this.handleSubmit}>
                  <p style={{marginBottom: "0px"}}>Logout</p>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <style jsx>{`
        
        `}</style>
      </div>
      )
    }

    return(
      <div style= {headerStyle}>
        <Navbar light= {this.props.light} dark= {!this.props.light} expand="md" style= {{paddingLeft: "3%", paddingRight: "3%"}}>
          <NavbarBrand href="/"><img src="/gradcap-dark.png" style={{width:"100px"}}></img></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="/classof/2020"><p>2020</p></NavLink>
              </NavItem>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="../about"><p>About</p></NavLink>
              </NavItem>
              <NavItem style={{marginRight: "10px"}}>
                <NavLink href="../how"><p>How This Works</p></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
               <p><DropdownToggle nav caret style={{marginRight: "10px"}}>
                Account
                </DropdownToggle></p>
                <DropdownMenu className= "dropdown" right style= {{backgroundColor: backgroundColor, marginTop: "7px"}}>
                  <DropdownItem>
                    <NavLink href="../register">Create</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="../login">Login</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <style jsx>{`
        
        `}</style>
      </div>
    )
  }
}

export default Header