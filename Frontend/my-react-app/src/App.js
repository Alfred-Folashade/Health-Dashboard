import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Glucose from './pages/GlucoseLogging'
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
        <Route
          path="/glucoseLogging" 
          element={
          <PrivateRoute>
            <Glucose/>
          </PrivateRoute>
        }/>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
