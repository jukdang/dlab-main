import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './pages/header'
import HomePage from './pages/HomePage'
import JackboardPage from './pages/JackBoardPage'

const MainPage = () => {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/JackBoard" element={<JackboardPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>

      

    </>
    
  )
}

export default MainPage
