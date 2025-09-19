import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Glucose from './pages/GlucoseLogging'
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Chatbot from './components/Chatbot'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
        <Route
          path="/glucoseLogging" 
          element={
          
            <Glucose/>
          
        }/>
        <Route 
          path="/dashboard" element={
            
              <Dashboard/>
            
          }>
        </Route>
        <Route path="/chat" element={<Chatbot/>}/>
      </Routes>
    </Router>
  );
}

export default App;
