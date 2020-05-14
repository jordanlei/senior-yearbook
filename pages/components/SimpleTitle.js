import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'
import {Component} from 'react'


  
class SimpleTitle extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const titleStyle= {
      textAlign: 'center', 
      minheight: '40vh',
    }

    if(this.props.type)
    {
      switch(this.props.type)
      {
        case "dark":
          titleStyle.backgroundImage= 'linear-gradient(#1C1C36,  #111129)'
          titleStyle.color= 'rgba(255, 255, 255, 0.7)'
      }
    }
  
    const spanStyle= {
    paddingTop: "10vh"
    }

    return(
      <div style= {titleStyle}>
        <div style= {spanStyle}>
          {this.props.children}  
        </div>
      </div>
    )
  }

}

export default SimpleTitle