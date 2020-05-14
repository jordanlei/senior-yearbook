import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import SimpleTitle from './components/SimpleTitle';
import StyleDiv from './components/StyleDiv';
import { Alert, Button, ButtonGroup, Row, Col, 
    Form, FormGroup, Label, Input, Card, CardDeck, CardColumns, Collapse} from 'reactstrap';
import { Component } from 'react'
import Layout from './components/Layout';
import './css/dashboard.css'
import Fade from 'react-reveal/Fade'
import Loading from './components/Loading';

class ClassUsers extends Component{
    constructor (props) {
        super(props)
        this.state = {
            collapse: false,
            query:"",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderCards= this.renderCards.bind(this)
        this.renderCardGroups= this.renderCardGroups.bind(this)
        this.toggle= this.toggle.bind(this)
        this.shuffle= this.shuffle.bind(this)
    }

    async componentDidMount() {
        var json= {isLive: true}
        console.log(json)
        try {
            const response = await fetch(`/api/findusers`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(json),
            })
            if (response.ok) {
            response.json().then(data => {
                this.setState({data: this.shuffle(data)})
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

    //generic input change handler
    handleInputChange(event) {
        const target = event.target;
        const name = target.id;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    }

    toggle(event) {
        var username= event.target.id
        var collapsename= "collapse" + username
        this.setState(state => ({ [collapsename]: !this.state[collapsename] }));
    }

    renderCards(){
        for( var i = 0; i < this.state.data.length; i++){ 
            if ( !this.state.data[i].isLive) {
              this.state.data.splice(i, 1); 
            }
        }

        return this.state.data.map((state)=>
        {
            var imageStyle=
            {backgroundImage: "url("+ state.avatar +")", 
            width: "12vw", 
            height: "12vw", 
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

            var cardStyle={
                width:"24vw", 
                marginBottom: "10%", 
                marginLeft: "5%", 
                marginRight: "5%",
                backgroundColor: "rgba(0, 0, 0, 0.7)"
            }

            var collapsename= "collapse" + state.username

            
            var bio= <div></div>
            if(state.bio)
            {
                bio= 
                <h5>
                    <br/>
                    <b>"</b>{state.bio}<b>"</b><br/>
                    <br/>
                </h5>

            }

            var cardContent= 
                (<div style={{padding: "10%"}}>
                <div>
                {avatar}
                </div>
                <div style={{textAlign: "center"}}>
                <h4>{state.firstName} {state.lastName}</h4>
                </div>
                {bio}
                <a href={"/view/" + state.username}>
                    <Button outline color="secondary" block id={state.username} onClick= {this.toggle}>View Page</Button>
                </a>

                </div>)
                      

            if (state.isLive)
            {
                var user = (state.username + " " + state.firstName + " " + state.lastName).toLowerCase()
                var query = this.state.query.toLowerCase()
                if(user.includes(query))
                {
                    console.log(user)
                    console.log(query)
                    return(
                        <Fade bottom duration={2000} delay={100}>
                        <Card className="classof-card" style={cardStyle}>
                        {cardContent}
                        </Card>
                        </Fade>
                    )
                } 
            }
            return 
        })

    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    renderCardGroups()
    {
        var cards= this.renderCards();
        var deck= [];
        var length= Math.floor((cards.length)/3)
        var lengths = []

        if (cards.length % 3 == 1)
        {
            lengths = [length + 1, length, length]
        }
        else if (cards.length % 3 == 2)
        {
            lengths = [length + 1, length + 1, length]
        }
        else
        {
            lengths = [length, length, length]
        }

        for(var i= 0; i< 3; i++)
        {
        var removed = cards.splice(0, lengths[i])
        deck.push(
            <Col md={4}>
            {removed}
            </Col>
        )
        }
        return <Row>{deck}</Row>
    }



    
    render(){
        const titleStyle= {
            textAlign: 'center', 
            minHeight: "100vh", 
            backgroundImage: "linear-gradient(rgb(8, 17, 44), rgba(16, 34, 88))  "  , 
            backgroundAttachment: "fixed",     
            backgroundSize: "cover",
            color: "rgba(255, 255, 255, 0.9)",
        }

        
        if(this.state.data){
        return(
        <div style={titleStyle}>
        <Layout>
            <SimpleTitle>
            <div>
            <Fade bottom duration={3000}>
            <div style={{width: "50vw", margin:"0 auto"}}>
                <h3>Class of {this.props.year}</h3>
                <FormGroup>
                <Input style={{ backgroundColor: "rgba(0, 0, 0, 0)", 
                                width: "50vw",
                                marginTop: "1em",
                                fontSize: "30px",

                            }}
                    type="text"
                    id="query"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    placeholder={"Search"}
                />
                </FormGroup>
            </div>
            </Fade>
            </div>
            </SimpleTitle>
            <StyleDiv >
            <div style={{marginTop: "5%"}}>
                {this.renderCardGroups()}
            </div>
            </StyleDiv>
        </Layout>
        </div>
        )
        }
        else
        {
            return(
            <div className="layout">
                    <Loading/>  
            </div>
            )
        }
    }
    
}

export default ClassUsers