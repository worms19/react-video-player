import React from "react";
import source from "./big_buck_bunny.mp4";
import { Progress } from 'reactstrap';

export class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: false,
      duration : 0,
      current : 0,
      progress : 0,
      volume : 0.5,
      seeking: false,
      seekedValue : 0,
    };

    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.volumeUp = this.volumeUp.bind(this);
    this.volumeDown = this.volumeDown.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);


  }

  handlePlayPause() {
    this.setState({
      played: !this.state.played
    });
    this.state.played ?  this.player.pause() :this.player.play()

  }



  volumeUp(){
    this.setState({
      volume : this.state.volume <= 0.9 ? this.state.volume + 0.1 : this.state.volume = 1
    })
    this.player.volume = this.state.volume ;

  }

  volumeDown(){
    this.setState({
      volume : this.state.volume >= 0.1 ? this.state.volume - 0.1 : this.state.volume = 0
    })
    this.player.volume = this.state.volume ;

  }
  handleProgress () {
    if(!this.state.seeking) {
      this.setState({
        progress: (this.player.currentTime / this.state.duration),
      });
    }
    console.log('onPr')

  }
  handleLoad (){
    this.setState({
      duration : this.player.duration
    });

}
  changeTime (evt) {
    this.setState({
      progress :  (Math.floor((evt.target.value) * 100) / 100)
    });

    console.log(this.state.progress)
    if(this.state.seeking){
    this.player.currentTime = (this.state.progress * this.state.duration);
    }


  }

  onSeekMouseUp(){
    this.setState({ seeking: false })
  }

  onSeekMouseDown(){
    this.setState({ seeking: true })
  }


  render() {
    const playStyle = { color: "purple" };
    const playButton = (
      <i className="fas fa-play-circle fa-4x" style={playStyle} />
    );
    const pauseButton = (
      <i className="fas fa-pause-circle fa-4x" style={playStyle} />
    );
    return (
      <div>
        <video
            ref={ref => this.player = ref}
            onTimeUpdate={this.handleProgress}

            onLoadedMetadata={this.handleLoad}>

          <source controls  src={source} type="video/mp4" />
        </video>

        <div>
          <button onClick={this.handlePlayPause}>
            {this.state.played ? pauseButton : playButton}
          </button>

          <button onClick={this.volumeDown}>
            <i className="fas fa-volume-down fa-4x" style={playStyle} />
          </button>
          <button onClick={this.volumeUp}>
            <i className="fas fa-volume-up fa-4x" style={playStyle} />
          </button>

        </div>


        <div>

          <div className="text-center " >{Math.floor((this.state.progress * this.state.duration) * 100) / 100} : {Math.floor(this.state.duration)}</div>




          <input className="width-70"
                 type='range'
                 min={0}
                 max={1}
                 step='any'
                 value={this.state.progress}
                 onChange={this.changeTime}
                 onMouseDown={this.onSeekMouseDown}
                 onMouseUp={this.onSeekMouseUp}
                 ref={ref2 => this.input = ref2}/>
        </div>
      </div>
    );
  }
}
