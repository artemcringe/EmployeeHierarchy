import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import './scss/app.scss'
import Home from './pages/Home';
import SignUp from './pages/Signup';
import SignIn from "./pages/Signin";



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
