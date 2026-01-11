import React, { useState } from 'react';
import './CreateNoteModal.css';

const CreateNoteModal = ({ show, onClose, onCreate }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title);
      setTitle('');
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create New Document</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Document Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Project Proposal"
                autoFocus
                required
              />
              <small className="form-text text-muted">
                You can start editing right after creation
              </small>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Create & Open Editor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;
