import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import SimpleTitle from './components/SimpleTitle';
import StyleDiv from './components/StyleDiv';
import { Alert, Button, Row, Col, Card, Modal, 
    ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input} from 'reactstrap';
import { Component } from 'react'
import Layout from './components/Layout';
import './css/dashboard.css'
import Fade from 'react-reveal/Fade'
import Loading from './components/Loading';
import NotFound from './notfound';
import { withAuthSync } from './utils/auth';
import cookie from 'js-cookie';
import CommentModal from './components/CommentModal';

class ViewUserPage extends Component{

    constructor (props) {
        super(props)
        this.state = {
            name: this.props.name,
            collapse: false,
            isOwn: false, 
            toEdit: false,
            modalVisible: false,
        }
        this.renderCards= this.renderCards.bind(this)
        this.renderCardGroups= this.renderCardGroups.bind(this)
        this.editOn= this.editOn.bind(this)
        this.editOff= this.editOff.bind(this)
        this.shuffle= this.shuffle.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleShow = this.handleShow.bind(this)
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
                    this.setState({fromuser: data})
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
        
        //get the user whose page will be viewed
        try {
            const response = await fetch('/api/finduser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.props.name })})
            if (response.ok){
                response.json().then(data => {
                    this.setState({user: data})
                })
            }
            else{
                this.setState({userError: "User Not Found"})
            }
        }
        finally{
            var json= {to: this.props.name}
            try {
                const response = await fetch(`/api/findcomments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
                })
                if (response.ok) {
                response.json().then(data => {
                    this.setState({data: data})
                    console.log("okay")
                    console.log(this.state.data)
                })
                } else {
                // https://github.com/developit/unfetch#caveats
                this.setState({error: "No Comments Found"})
                }
            } catch (error) {
                console.error(
                'You have an error in your code or there are Network issues.',
                error
                )
            }
            this.setState({loaded: true})
        }
    }

    editOn(state) {
        this.setState({toEdit: true, flagEdit: state, comment: state.comment});
        console.log(this.state)
    }

    editOff(event) {
        this.setState({toEdit: false});
        console.log(this.state)
    }

    renderCards(){
        return this.state.data.map((state)=>
        {
            var imageStyle=
            {backgroundImage: "url("+ state.avatar +")", 
            width: "100px", 
            height: "100px", 
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
            
            var comment= <div></div>
            if(state.comment)
            {
                comment= 
                <h5>
                    <br/>
                    {state.comment}<br/>
                    <br/>
                </h5>

            }

            if(state.audiobuffer){
                console.log("Got here")
                var myRef = React.createRef();
                var audio=<div><h1>There is audio here</h1></div>
                // <div style={{paddingTop: "10px"}}>
                //     <audio style={{width: "100%"}} controls ref={myRef} src={URL.createObjectURL(state.audiofile)}/>
                // </div>
                console.log(audio)
            }
            else
            {
                var audio=<div></div>
            }

            if(state.image){
                var image=<img src={state.image} style={{width: "100%"}}/>
            }
            else
            {
                var image=<div></div>
            }
    

            var cardContent= 
                (<div style={{padding: "10%"}}>
                <div>
                {avatar}
                </div>
                <div style={{textAlign: "center"}}>
                <h4>{state.firstName} {state.lastName}</h4>
                </div>
                {comment}
                {image}
                </div>)
            

            if (this.state.fromuser)
            {
                if (this.state.fromuser.username == state.from)
                {
                    return(
                        <Fade bottom duration={2000} delay={100}>
                            <Card style={cardStyle}>
                            {cardContent}
                            <Button color="danger" id={state._id} onClick={() => this.editOn(state)}>Edit / Delete</Button>
                            </Card>
                        </Fade>
                    )
                }
            }
            
            return(
                <Fade bottom duration={2000} delay={100}>
                <Card style={cardStyle}>
                {cardContent}
                </Card>
                </Fade>
            )

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
        var cards= this.renderCards().reverse();
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

    handleInputChange(event) {
        const target = event.target;
        const name = target.id;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    }

    handleCancel(){
        this.setState({modalVisible: false, toEdit: undefined})
        console.log(this.state)
    }

    handleShow(){
        this.setState({modalVisible: true})
    }

    render(){
        const titleStyle= {
            textAlign: 'center', 
            minHeight: "100vh", 
            backgroundImage: "linear-gradient(rgba(16, 34, 88), rgba(2, 4, 11))  " , 
            backgroundAttachment: "fixed",     
            backgroundSize: "cover",
            color: "rgba(255, 255, 255, 0.9)"
        }

        if(this.state.userError){
            return(
                <NotFound/>
            )
        }

        var button=
        <a href="../login">
            <Button color='primary' onClick={this.handleShow}>
                <h4 style={{fontSize: "20px"}}>Login To Make A Post</h4>
            </Button>
        </a>
        var commentmodal = <div></div>
        if(this.state.user){
            if(this.state.fromuser){
                button=
                <Button color='primary' onClick={this.handleShow}>
                    <h4 style={{fontSize: "25px"}}>Make A Post</h4>
                </Button>
                if(this.state.modalVisible){
                    var data = {
                        from: this.state.fromuser.username, 
                        firstName: this.state.fromuser.firstName, 
                        lastName: this.state.fromuser.lastName, 
                        avatar: this.state.fromuser.avatar, 
                        to: this.state.user.username
                    }
                    commentmodal = <CommentModal data = {data} handleCancel= {this.handleCancel} create/>
                }
            }
            else{
                button = 
                <Button color='primary' onClick={this.handleShow}>
                    <h4 style={{fontSize: "25px"}}>Make A Post</h4>
                </Button>
                if(this.state.modalVisible){
                    commentmodal = <CommentModal data={{from: "anon", to: this.state.user.username}} handleCancel= {this.handleCancel} create anon/>
                }
            }
        }

        var editmodal =<div></div>
        if(this.state.toEdit){
            editmodal= <CommentModal data = {this.state.flagEdit} handleCancel= {this.handleCancel}/>
        }
        
        if(this.state.data){
            var header=
            <div>
                <h2>{this.state.user.firstName} {this.state.user.lastName}</h2>
                <p>{this.state.user.bio}</p>
                {button}
            </div>
            if(this.state.user.avatar){
                var imageStyle=
                    {backgroundImage: "url("+ this.state.user.avatar +")", 
                        width: "25vw", 
                        height: "25vw", 
                        margin: "0 auto",
                        backgroundPosition:"center",
                        backgroundSize:"cover",
                        marginBottom: "1em",
                    }
                header= 
                <Row>
                    <Col md= {6}><Card style={imageStyle}></Card></Col>
                    <Col md = {6} style={{paddingLeft: "5%"}}>
                    <h2>{this.state.user.firstName} {this.state.user.lastName}</h2>
                    <p>{this.state.user.bio}</p>
                    {button}
                    </Col>
                </Row>
            }

            
            return(
            <div style={titleStyle}>
            <Layout>
                {commentmodal}
                {editmodal}
                <SimpleTitle>
                <div>
                <Fade bottom duration={3000}>
                    <div className="text-center" style={{width: "50vw", margin:"0 auto"}}>
                        {header}   
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

export default withAuthSync(ViewUserPage)