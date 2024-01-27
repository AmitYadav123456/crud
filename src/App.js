import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Navbar from './component/layout/Navbar'
import Home from './component/pages/Home'
import About from './component/pages/About'
import Contact from './component/pages/Contact'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Adduser from './component/users/Adduser'
import EditUser from './component/users/EditUser'
import View from './component/users/View'

const App = () => {
  return (
    <div className='App'>
     <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/add/user" element={<Adduser />} />
          <Route exact path="/edit/user/:id" element={<EditUser />} />
          <Route exact path="/user/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App