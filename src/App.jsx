import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'

const App = () => {
  return (
    <div className='main'>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/tasks' element={<TasksPage />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App