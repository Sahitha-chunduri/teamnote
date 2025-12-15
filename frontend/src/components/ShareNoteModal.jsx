import React, { useState } from 'react';
import { mockAvailableUsers } from '../data/mockData';
import './ShareNoteModal.css';

const ShareNoteModal = ({ show, onClose, note, onShare, onRemoveShare }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [permission, setPermission] = useState('view');
  const [searchEmail, setSearchEmail] = useState('');

  const handleShare = () => {
    if (selectedUser) {
      const user = mockAvailableUsers.find(u => u.id === parseInt(selectedUser));
      if (user && !note.sharedWith.find(s => s.id === user.id)) {
        onShare(note.id, user.id, user.email, user.name, permission);
        setSelectedUser('');
        setPermission('view');
      }
    } else if (searchEmail.trim()) {
      // For custom email input
      const user = mockAvailableUsers.find(u => u.email === searchEmail);
      if (user) {
        onShare(note.id, user.id, user.email, user.name, permission);
        setSearchEmail('');
        setPermission('view');
      } else {
        // In a real app, this would create an invitation for non-registered users
        alert('User not found in system. In production, this would send an invitation.');
        setSearchEmail('');
      }
    }
  };

  const alreadyShared = note.sharedWith || [];
  const availableUsers = mockAvailableUsers.filter(
    u => !alreadyShared.find(s => s.id === u.id)
  );

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Share "{note.title}"</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        <div className="modal-body">
          <div className="share-section">
            <h6>Add People</h6>
            
            <div className="mb-3">
              <label htmlFor="userSelect" className="form-label">
                Select User
              </label>
              <select
                className="form-select"
                id="userSelect"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Choose a user...</option>
                {availableUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="permission" className="form-label">
                Permission
              </label>
              <select
                className="form-select"
                id="permission"
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
              >
                <option value="view">View Only</option>
                <option value="edit">Can Edit</option>
              </select>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleShare}
              disabled={!selectedUser}
            >
              Add Person
            </button>
          </div>

          {alreadyShared.length > 0 && (
            <div className="shared-with-section">
              <h6>Currently Shared With</h6>
              <div className="shared-list">
                {alreadyShared.map(user => (
                  <div key={user.id} className="shared-item">
                    <div className="shared-info">
                      <p className="mb-0 fw-500">{user.name}</p>
                      <small className="text-muted">{user.email}</small>
                    </div>
                    <div className="shared-permission">
                      <span className={`badge bg-${user.permission === 'edit' ? 'success' : 'info'}`}>
                        {user.permission === 'edit' ? 'Edit' : 'View'}
                      </span>
                      <button
                        className="btn btn-sm btn-link text-danger"
                        onClick={() => onRemoveShare(note.id, user.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareNoteModal;
