import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import CreateNoteModal from '../components/CreateNoteModal';
import ShareNoteModal from '../components/ShareNoteModal';
import { useNotes } from '../context/NotesContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userNotes, sharedNotes, loading, error, createNote, deleteNote, shareNoteWithUser, removeNoteShare, updateSharePermission } = useNotes();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleCreateNote = async (title) => {
    try {
      const newNote = await createNote(title, '');
      setShowCreateModal(false);
      // Redirect to editor
      navigate(`/editor/${newNote.id}`);
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  const handleShareClick = (note) => {
    setSelectedNote(note);
    setShowShareModal(true);
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteNote(noteId);
      } catch (err) {
        console.error('Failed to delete note:', err);
      }
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="create-document-section">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="bi bi-file-earmark-plus"></i> Create New Document
          </button>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="notes-section">
              <h4 className="section-title">
                <i className="bi bi-file-text"></i> My Documents
              </h4>
              <p className="text-muted">Documents you created and own</p>

              {loading ? (
                <div className="loading-state text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading documents...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-circle"></i> {error}
                </div>
              ) : userNotes.length === 0 ? (
                <div className="empty-state">
                  <p>No documents yet. Create your first one!</p>
                </div>
              ) : (
                <div className="notes-list">
                  {userNotes.map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      isOwned={true}
                      onShare={() => handleShareClick(note)}
                      onDelete={() => handleDeleteNote(note.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="notes-section">
              <h4 className="section-title">
                <i className="bi bi-share"></i> Shared With Me
              </h4>
              <p className="text-muted">Documents others shared with you</p>

              {sharedNotes.length === 0 ? (
                <div className="empty-state">
                  <p>No documents shared with you yet</p>
                </div>
              ) : (
                <div className="notes-list">
                  {sharedNotes.map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      isOwned={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateNoteModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateNote}
      />

      {selectedNote && (
        <ShareNoteModal
          show={showShareModal}
          onClose={() => setShowShareModal(false)}
          note={selectedNote}
          onShare={shareNoteWithUser}
          onRemoveShare={removeNoteShare}
          onUpdateShare={updateSharePermission}
        />
      )}
    </div>
    </div>
  );
};

export default Dashboard;
