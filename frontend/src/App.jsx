import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { Provider } from 'react-redux'
import { store } from './app/store'

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Provider>
  )
}

export default App
