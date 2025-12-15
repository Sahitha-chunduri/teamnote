import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, isOwned = false, onShare = null, onDelete = null, onEdit = null }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h5 className="note-title">{note.title}</h5>
        {isOwned && (
          <span className="badge bg-primary">Your Note</span>
        )}
        {!isOwned && note.permission && (
          <span className={`badge bg-${note.permission === 'edit' ? 'success' : 'info'}`}>
            {note.permission === 'edit' ? 'Can Edit' : 'View Only'}
          </span>
        )}
      </div>

      <p className="note-description">{note.description}</p>

      {isOwned && note.sharedWith && note.sharedWith.length > 0 && (
        <div className="shared-with">
          <small className="text-muted">Shared with {note.sharedWith.length} user(s)</small>
          <div className="shared-users">
            {note.sharedWith.slice(0, 3).map(user => (
              <div key={user.id} className="shared-user-badge">
                {user.name.charAt(0)}
              </div>
            ))}
            {note.sharedWith.length > 3 && (
              <div className="shared-user-badge">+{note.sharedWith.length - 3}</div>
            )}
          </div>
        </div>
      )}

      {!isOwned && note.ownedBy && (
        <p className="text-muted mb-2">
          <small>Shared by <strong>{note.ownedBy.name}</strong></small>
        </p>
      )}

      <div className="note-footer">
        <small className="text-muted">
          {formatDate(note.updatedAt)}
        </small>
        <div className="note-actions">
          {isOwned && onShare && (
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={onShare}
              title="Share with others"
            >
              <i className="bi bi-share"></i> Share
            </button>
          )}
          {isOwned && onDelete && (
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={onDelete}
              title="Delete note"
            >
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
