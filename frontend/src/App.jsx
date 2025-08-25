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
import ApplicantProfile from './pages/Applicant/ApplicantProfile'
import ApplicantDetails from './pages/Applicant/ApplicantDetails'
import EmployerProfile from './pages/Employer/EmployerProfile'
import EmployerDetails from './pages/Employer/EmployerDetails'
import JobForm from './pages/Job/JobForm'
import Dashboard from './pages/Job/Dashboard'

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/register' element={<AuthorizedRoute><Register /></AuthorizedRoute>} />
        <Route path='/login' element={<AuthorizedRoute><Login /></AuthorizedRoute>} />
        <Route path='/applicant-profile' element={<ProtectedRoute><ApplicantProfile /></ProtectedRoute>} />
        <Route path='/applicant-details' element={<ProtectedRoute><ApplicantDetails /></ProtectedRoute>} />
        <Route path='/employer-profile' element={<ProtectedRoute><EmployerProfile /></ProtectedRoute>} />
        <Route path='/employer-details' element={<ProtectedRoute><EmployerDetails /></ProtectedRoute>} />
        <Route path='/job-form' element={<ProtectedRoute><JobForm /></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Provider>
  )
}

export default App
