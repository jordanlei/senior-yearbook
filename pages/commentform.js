import React, { Component } from 'react';
import Router from 'next/router';
import { Form, FormGroup, Label, Input, Button, Alert, Card } from 'reactstrap';
import SimpleTitle from './components/SimpleTitle';
import Layout from './components/Layout';
import StyleDiv from './components/StyleDiv';
import Fade from 'react-reveal/Fade'

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        from: this.props.data.from,
        firstName: this.props.data.firstName, 
        lastName: this.props.data.lastName, 
        to: this.props.data.to,
        avatar: this.props.data.avatar,
        comment: "", 
        submitted: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        var json = {
            from: this.state.from,
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            to: this.state.to,
            avatar: this.state.avatar,
            comment: this.state.comment, 
          };

        console.log(json)
    
        try {
          const response = await fetch(`/api/createcomment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
          })
    
          if (response.ok) {
            response.json().then(res => 
                {
                    this.setState({error: '', submitted: true})
                })
          } else {
            // https://github.com/developit/unfetch#caveats
            this.setState({error: "Comment Failed"})
          }
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
        }
      }

    render() {
        var errorMessage= <div></div>
        if(this.state.error)
        {
            errorMessage= <Alert color= 'danger'>{this.state.error}</Alert>
        }

        if(this.state.submitted)
        {
            console.log("Redirecting ...")
            Router.push('/view/'+ this.state.to)
        }

        var cardStyle={
            backgroundColor: "rgba(0, 0, 0, 0.7)"
        }

        return (
        <Card style={cardStyle}>
            <Form style={{paddingLeft: "5%", paddingRight:"5%", paddingTop: "5%", paddingBottom: "5%"}}>
                {errorMessage}
                <FormGroup>
                    <h5>Leave A Comment on This Page</h5>
                    <Input
                        style={{minHeight: "5em"}}
                        type="textarea"
                        id="comment"
                        value={this.state.comment}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <div className="center-row" id="submit">
                    <Button id="submit" onClick={this.handleSubmit} disabled={this.state.error}>
                            Submit
                    </Button>
                </div>
            </Form>
        </Card>
        );
    }
  }
  
  export default CommentForm;