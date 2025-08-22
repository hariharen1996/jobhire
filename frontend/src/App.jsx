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
import ProtectedRoute from './components/routes/ProtectedRoute'
import AuthorizedRoute from './components/routes/AuthorizedRoute'

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/register' element={<AuthorizedRoute><Register /></AuthorizedRoute>} />
        <Route path='/login' element={<AuthorizedRoute><Login /></AuthorizedRoute>} />
      </Routes>
    </Provider>
  )
}

export default App
