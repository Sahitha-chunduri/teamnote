import React, { useState } from 'react';
import './CreateNoteModal.css';

const CreateNoteModal = ({ show, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title, description);
      setTitle('');
      setDescription('');
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
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your document"
                rows="3"
              ></textarea>
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
              Create Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;
