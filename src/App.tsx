import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './pages/components/headers/Header'
import HomePage from './pages/HomePage'
import JackboardPage from './pages/JackBoardPage'
import JackMain from './pages/components/jackBoard/jackMain'

const MainPage = () => {

  return (
    <JackMain />
  )
  
  // return (
  //   <>
  //     <Header />
  //     <Routes>
  //       <Route path="/" element={<HomePage />} />
  //       <Route path="/JackBoard" element={<JackboardPage />} />
  //       {/* <Route path="/contact" element={<ContactPage />} /> */}
  //     </Routes>
  //   </>
  // )
}

export default MainPage
