import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import StartGame from './pages/StartGame/StartGame'
import { Toaster } from 'sonner';
import PlayGameContainer from './pages/PlayGame/PlayGameContainer';
import Home from './pages/Home/Home'


function App() {
  return (
    <>
      <Routes>
        <Route path='/start' element={<StartGame />} />
        <Route path='/play' element={<PlayGameContainer />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Toaster
        position="top-right"
        richColors
        duration={2000}
        toastOptions={{
          style: {
            padding: '15px 25px',
            fontSize: '1rem',
          },
        }}
      />
    </>
  )
}

export default App
