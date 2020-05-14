import React, { Component } from 'react';
import SimpleTitle from './components/SimpleTitle';
import Layout from './components/Layout';
import StyleDiv from './components/StyleDiv';




const PeopleViewAll = props => (
    <Layout light>
        <SimpleTitle>
            <h3>Welcome, {props.content.id}</h3>
        </SimpleTitle>
        <div className="light-container">
            <StyleDiv>
                <h4 style={{textAlign: "center"}}>Here's a list of other users!</h4>
            </StyleDiv>  
        </div>
        
    </Layout>
  )
  
  PeopleViewAll.getInitialProps = async function(context) {
    var content= context.query
    return {content}
  }
  
  export default PeopleViewAll