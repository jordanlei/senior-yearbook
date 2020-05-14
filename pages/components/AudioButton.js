import Header from './Header'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'
import {Component} from 'react'
import {Button} from 'reactstrap'
const MicRecorder = require('mic-recorder-to-mp3')
const recorder = new MicRecorder({bitRate: 128})
  
class AudioButton extends Component{
  constructor(props) {
    super(props)
    this.state = {
        isRecording: false
    }
    this.startRecording = this.startRecording.bind(this)
    this.stopRecording = this.stopRecording.bind(this)
  }

  startRecording(event){
    recorder.start().then(() => {
        this.setState({isRecording: true})
    }).catch((e) => {
        console.error(e);
    });
  }

  stopRecording(event) {
    recorder.stop().getMp3().then(([buffer, blob]) => {
      const file = new File(buffer, 'music.mp3', {
        type: blob.type,
        lastModified: Date.now()
      });
      this.setState({audio: URL.createObjectURL(file), isRecording: false})

    }).catch((e) => {
      console.error(e);
    });
  }

  render(){
    if(!this.state.isRecording){
        var button=<Button color="primary" onClick={this.startRecording}>Record</Button>
    }
    else{
        var button=<Button color='danger' onClick={this.stopRecording}>Stop</Button>
    }

    if(this.state.audio){
        console.log("Got here")
        var myRef = React.createRef();
        var audio=<audio controls ref={myRef} src={this.state.audio}/>
        console.log(audio)
    }
    else
    {
        var audio=<div></div>
    }

    return(
        <div class="container text-center">
            <h1>Recording</h1>
            {button}<br/>
            {audio}
            <ul id="playlist"></ul>
        </div>
    )
  }

}

export default AudioButton