import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EfeitoAguaNaBocaPage from './pages/EfeitoAguaNaBocaPage'

import WorkshopPage from './pages/WorkshopPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/efeito-agua-na-boca" element={<EfeitoAguaNaBocaPage />} />
        <Route path="/workshop" element={<WorkshopPage />} />
      </Routes>
    </Router>
  )
}

export default App
