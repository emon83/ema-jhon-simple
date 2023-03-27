import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/favicon.ico'
import './App.css'
import Header from './components/Header/Header'
import Shop from './components/Shop/Shop'

function App() {

  return (
    <div className="App">
      <Header></Header>
      <Shop/>
    </div>
  )
}

export default App;
