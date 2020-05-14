import UserHeader from './UserHeader'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'

import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'
import {Component} from 'react'
import {Spinner} from 'reactstrap'



  
class Loading extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const titleStyle= {
      textAlign: 'center', 
      minHeight: "100vh", 
      backgroundImage: "linear-gradient(rgba(16, 34, 88), rgba(2, 4, 11))" , 
      backgroundAttachment: "fixed",     
      backgroundSize: "cover", 
      color: "rgba(255, 255, 255, 0.9)"
    }

    var quote = ""
    var random = Math.random()
    if(random < 0.2){
      quote = "Social Distancing from Finals..."
    }
    else if (random < 0.4){
      quote = "Busy Procrastinating..."
    }
    else if (random < 0.6){
      quote = "Reselling Textbooks..."
    }
    else if (random < 0.8){
      quote = "Getting Some Sleep (Finally)..."
    }
    else{
      quote = "Attending Zoom Graduation..."
    }
    return(
      <div className= "layout" style= {titleStyle}>
        <div style= {{margin: "0 auto", width: "40vw", textAlign: "center", paddingTop: "20vh"}}>
          <h4>Please wait... <br/>{quote} <br/><br/></h4>
          <div className="my-spinner" style={{margin: "0 auto", width: "200px"}}>
            <div className="my-loader" style={{margin: "0 auto", width: "200px"}}>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Loading