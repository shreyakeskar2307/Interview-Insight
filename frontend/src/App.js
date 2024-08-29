import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Student from './Student';
import Request from './request';
import Write from './write';
import Webpage from './webpage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Student/>}></Route>
          <Route path='/request' element={<Request/>}></Route>
          <Route path='/write' element={<Write/>}></Route>
          <Route path='/webpage' element={<Webpage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
