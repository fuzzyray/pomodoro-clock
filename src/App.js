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
        <p>Sound clip created by <a
          href="https://www.facebook.com/AlexanderBluMusic/"
          title="Alexander Blu" target="_blank" rel="noopener noreferrer">Alexander
          Blu</a> from <a
          href="http://www.orangefreesounds.com" title="Orange Free Sounds"
          target="_blank"
          rel="noopener noreferrer">orangefreesounds.com</a> and licensed
          under <a href="http://creativecommons.org/licenses/by/4.0/"
                   title="CC BY 4.0" target="_blank" rel="noopener noreferrer">
            Creative Commons Attribution 4.0 International License</a></p>
      </footer>
    </div>
  )
}

export default App
