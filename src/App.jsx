import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ParentConsole from './components/parent/ParentConsole'
import ChildConsole from './components/child/ChildConsole'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import RecognitionConsole from './components/Recognition/RecognitionConsole'

const App = () => {
  return (
    <div className='bg-neutral-950'>
      <Router>
        <Header />
        <Routes>
          <Route path="/parent" element={<ParentConsole />} />
          <Route path="/child" element={<ChildConsole />} />
          <Route path="/recognition" element ={<RecognitionConsole/>}/> 
          <Route path="/" element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
      
    </div>
  )
}

export default App
