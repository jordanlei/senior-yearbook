import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Layout from './components/Layout';
import SimpleTitle from './components/SimpleTitle'
import Fade from 'react-reveal/Fade'

class How extends Component {
  
  render() {
    const titleStyle= {
      textAlign: 'center', 
      minHeight: "100vh", 
      backgroundImage: "linear-gradient(rgb(0, 0, 0), rgb(12, 26, 66)) " , 
      color: "rgba(255, 255, 255, 0.9)",
      backgroundAttachment: "fixed",     
      backgroundSize: "cover"
    }

    return (
      <div style={titleStyle}>
      <Layout>
        <div style={{padding: "10%", paddingTop: "15vh" , minHeight: "60vh"}}>            
          <div>
          
          <Row>
            <Col md={1}/>
            <Col md={2}>
            <Fade duration={3000}>
            <div style={{position: "fixed", top: "30vh", width:"20vw"}}>
            <h2>How This Works</h2><br/>
            <p><i>Need Help? Email remotesenioryearbook [at] gmail.com</i></p>
            </div>
            <div style={{position: "fixed", top: "60vh", width:"20vw"}}>
            </div>
            </Fade>
            </Col>
            <Col md={2}>
            </Col>
            <Col md={6}>
            {/* <Fade duration={3000}>
              <div className="center-row">
                <h4>Welcome to the Yearbook.<br/><br/></h4>
              </div>
              </Fade> */}
              <Fade bottom>
              <p>
              This is a yearbook, just like the physical one
              we might have if it didn't feel like the world was ending.
              The idea behind this website is to bring us all a little closer
              and get a chance to celebrate what we've achieved.<br/><br/>
              You can visit people's pages and leave comments by posting 
              on their wall (no account needed). 
              You'll want to create an account or sign in if you want
              to Edit or Delete these comments after you post them. <br/><br/>
              If you want a page of your own, make an account
              (Account > Create). Then invite your friends to leave comments / posts!<br/><br/>
              <b>Account and Comment Submissions close on May 29, 2020 11:59 PM EST, after 
              which this site will remain accessible but won't accept new changes.</b>
              </p>
              </Fade>
            </Col>
          </Row>
          </div>
        </div>
      </Layout>
      </div>
    );
  }
}



export default How;
