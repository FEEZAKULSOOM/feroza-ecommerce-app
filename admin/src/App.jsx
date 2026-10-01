import react from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import { useContext } from 'react'
import  {adminDataContext}  from "../context/AdminContext.jsx";
  import { ToastContainer, toast } from 'react-toastify';

export default function App() {
   let {adminData } = useContext(adminDataContext)
  return (
    <>
     <ToastContainer />
    {  !adminData  ?  <Login /> :
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    
      <Route path="/add" element={<Add/>} />
      <Route path="/list" element={<List/>} />
      <Route path="/orders" element={<Orders/>} />

     </Routes>
      }
    </>
  )
}