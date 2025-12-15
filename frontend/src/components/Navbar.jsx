import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          <i className="bi bi-file-text"></i> DocShare
        </Link>
        
        <div className="ms-auto d-flex align-items-center">
          {user && (
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="rounded-circle"
                  style={{ width: '32px', height: '32px' }}
                />
                <span className="d-none d-sm-inline">{user.name}</span>
              </button>
              {showDropdown && (
                <div className="dropdown-menu dropdown-menu-end show">
                  <h6 className="dropdown-header">{user.email}</h6>
                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
