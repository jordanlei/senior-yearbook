import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Layout from './components/Layout';
import SimpleTitle from './components/SimpleTitle'
import Fade from 'react-reveal/Fade'

class NotFound extends Component {
  
  render() {
    const titleStyle= {
      textAlign: 'center', 
      minHeight: "100vh", 
      backgroundImage: "linear-gradient(rgb(208, 212, 229), rgb(159, 167, 201))", 
      backgroundAttachment: "fixed",     
      backgroundSize: "cover"
    }

    return (
      <div style={titleStyle}>
      <Layout light>
        <div style={{padding: "10%", paddingTop: "30vh" , minHeight: "60vh"}}>   
        <h2>Aw, shit. That's a 404.</h2>         
        </div>
      </Layout>
      </div>
    );
  }
}

export default NotFound;
