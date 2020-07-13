import React from 'react'
import './App.css'
import PomodoroClock from './Clock'

function App () {
  return (
    <div className="App">
      <header className="AppHeader">
        <h1>Pomodoro Clock</h1>
      </header>
      <div className="AppContent">
        <PomodoroClock/>
      </div>
      <footer className="AppFooter">
        <p>Tomato icon made by <a
          href="https://www.flaticon.com/authors/freepik" title="Freepik"
          target="_blank" rel="noopener noreferrer">Freepik</a> from <a
          href="https://www.flaticon.com/" title="Flaticon" target="_blank"
          rel="noopener noreferrer">www.flaticon.com</a></p>
        <p>Sound clip created by Daniel Simion from <a
          href="http://soundbible.com" title="Soundbible" target="_blank"
          rel="noopener noreferrer">soundbible.com</a></p>
      </footer>
    </div>
  )
}

export default App
