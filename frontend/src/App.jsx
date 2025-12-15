import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotesProvider>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </NotesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
