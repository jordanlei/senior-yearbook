import Link from 'next/link'
import React, {Component} from 'react';
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

class UserHeader extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    return(
      <div style= {{position: "fixed", width: "100vw", backgroundColor: "rgba(0, 0, 0, 0.7)"}}>
        <Navbar dark expand="md" style= {{paddingLeft: "3%", paddingRight: "3%"}}>
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="../about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="../profile">Profile</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <style jsx>{`
        
        `}</style>
      </div>
    )
  }
}

export default UserHeader