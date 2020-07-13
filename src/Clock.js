import React from 'react'
import './Clock.css'

const Button = (props) => {
  return (
    <button className={'TimerButton pure-button'} id={props.id}
            style={props.style}
            onClick={() => props.onClick(props.id)}>{props.label}</button>
  )
}

const TimerControl = (props) => {
  const incrementChar = <i className="fas fa-caret-right"/>
  const decrementChar = <i className="fas fa-caret-left"/>
  const labelID = props.label.toLowerCase() + '-label'
  const label = props.label + ' Length'
  const incrementID = props.label.toLowerCase() + '-increment'
  const decrementID = props.label.toLowerCase() + '-decrement'
  const lengthID = props.label.toLowerCase() + '-length'

  return (
    <div className={props.className}>
      <p id={labelID} style={{ gridArea: 'label' }}>{label}</p>
      <Button id={incrementID} label={incrementChar}
              style={{
                gridArea: 'increment',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
              }} onClick={props.onClick}/>
      <p id={lengthID} style={{
        gridArea: 'length',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>{props.value}</p>
      <Button id={decrementID} label={decrementChar}
              style={{
                gridArea: 'decrement',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
              }} onClick={props.onClick}/>
    </div>
  )
}

const Timer = (props) => {
  return (
    <React.Fragment>
      <p id={'timer-label'}>{props.label}</p>
      <p id={'time-left'}>{props.value}</p>
    </React.Fragment>
  )
}

const ClockControls = (props) => {
  const start = <i className="fas fa-play"/>
  const pause = <i className="fas fa-pause"/>
  const reset = <i className="fas fa-redo"/>

  const start_stop = (props.running) ? pause : start

  return (
    <React.Fragment>
      <Button label={start_stop} id={'start_stop'}
              onClick={() => props.onClick('start_stop')}/>
      <img src={'assets/tomato.svg'} width={'75px'} height={'75px'} alt=''/>
      <Button label={reset} id={'reset'}
              onClick={() => props.onClick('reset')}/>
    </React.Fragment>
  )
}

class PomodoroClock extends React.Component {
  constructor (props) {
    super(props)
    this.clockStateLabel = ['Session', 'Break']
    this.state = this.defaultState()
  }

  defaultState = () => {
    return ({
      breakLength: 5,
      sessionLength: 25,
      clockState: 0,
      running: false,
      timeLeft: 25 * 60,
      timerFunction: null,
    })
  }

  handleClick = (value) => {
    const newState = {}
    switch (value) {
      case 'break-decrement':
        newState.breakLength = this.state.breakLength - 1
        break
      case 'session-decrement':
        newState.sessionLength = this.state.sessionLength - 1
        break
      case 'break-increment':
        newState.breakLength = this.state.breakLength + 1
        break
      case 'session-increment':
        newState.sessionLength = this.state.sessionLength + 1
        break
      case 'reset':
        if (this.state.timerFunction) {
          this.state.timerFunction.cancel()
        }
        this.setState(this.defaultState())
        this.audioBeep.pause()
        this.audioBeep.currentTime = 0
        return
      case 'start_stop':
        if (this.state.running && this.state.timerFunction) {
          this.state.timerFunction.cancel()
          this.setState({ timerFunction: null, running: !this.state.running })
        } else {
          this.setState({
            timerFunction: window.accurateInterval(1000,
              () => this.updateTime()), running: !this.state.running,
          })
        }
        return
      default:
        return
    }
    const key = Object.keys(newState)[0]
    if (newState[key] <= 0) {
      newState[key] = 1
    } else if (newState[key] > 60) {
      newState[key] = 60
    }
    if (!this.state.running) {
      // Only update time length if paused
      if ((this.clockStateLabel[this.state.clockState] === 'Session' && key ===
        'sessionLength') ||
        (this.clockStateLabel[this.state.clockState] === 'Break' && key ===
          'breakLength')) {
        newState.timeLeft = newState[key] * 60
      }
      this.setState(newState)
    }
  }

  updateTime = () => {
    /*
    Subtract one second, if we hit 0, then flip states and play audio
    */
    const newState = {}
    let currentTime = this.state.timeLeft
    if (currentTime === 0) {
      if (this.state.clockState === 0) {
        newState.clockState = 1
        currentTime = this.state.breakLength * 60
      } else {
        newState.clockState = 0
        currentTime = this.state.sessionLength * 60
      }
      this.audioBeep.play()
    } else {
      currentTime--
    }
    newState.timeLeft = currentTime
    this.setState(newState)
  }

  formatTime = (value) => {
    const minutes = Math.floor(value / 60)
    const seconds = value % 60
    return ((minutes < 10 ? '0' + minutes.toString() : minutes.toString()) +
      ':' + (seconds < 10 ? '0' + seconds.toString() : seconds.toString()))
  }

  componentWillUnmount () {
    if (this.state.timerFunction) {
      this.state.timerFunction.cancel()
    }
  }

  /*
  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('State:', this.state)
  }
  */

  render () {
    return (
      <div className="PomodoroClock">
        <div className="SessionContainer">
          <TimerControl className="TimerControl" label={this.clockStateLabel[0]}
                        value={this.state.sessionLength}
                        onClick={this.handleClick}/>
        </div>
        <div className="BreakContainer">
          <TimerControl className="TimerControl" label={this.clockStateLabel[1]}
                        value={this.state.breakLength}
                        onClick={this.handleClick}/>
        </div>
        <div className="TimerContainer">
          <Timer label={this.clockStateLabel[this.state.clockState]}
                 value={this.formatTime(this.state.timeLeft)}/>
        </div>
        <div className="ControlsContainer">
          <ClockControls running={this.state.running}
                         onClick={this.handleClick}/>
        </div>
        <audio id='beep' ref={(ref) => this.audioBeep = ref}
               src='assets/analog-watch-alarm_daniel-simion.mp3'/>
      </div>
    )
  }
}

export default PomodoroClock