
import './App.css'
import Employee from './components/Employee'
import Footer from './components/Footer'
import Header from './components/Header'
import ListEmpComponent from './components/ListEmpComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
          <Header/>
          <Routes>
             <Route path='/' element={<ListEmpComponent/>}></Route>
             <Route path='/employees' element={<ListEmpComponent/>}></Route>
             <Route path='/add-employee' element={<Employee/>}></Route>
             <Route path='/edit-employee/:id' element={<Employee/>}></Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
