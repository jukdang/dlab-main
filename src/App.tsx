import './App.css'
import MainHeader from './components/main_page/header'
import MainSection1 from './components/main_page/Section1'
import MainSection2 from './components/main_page/Section2'

const MainPage = () => {
  
  return (
    <>
      <MainHeader />
      <div className='main'>
        <MainSection1 />
        <MainSection2 />
      </div>

    </>
    
  )
}

export default MainPage
