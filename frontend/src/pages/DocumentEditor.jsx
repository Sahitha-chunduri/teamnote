import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import { notesService } from '../services/api';
import './DocumentEditor.css';

const DocumentEditor = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { userNotes, sharedNotes, updateNote: updateNoteInContext } = useNotes();
  
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasEditPermission, setHasEditPermission] = useState(true);

  useEffect(() => {
    // Find the note from both userNotes and sharedNotes
    let foundNote = userNotes.find(n => n.id === parseInt(noteId));
    let isOwner = true;
    
    if (!foundNote) {
      foundNote = sharedNotes.find(n => n.id === parseInt(noteId));
      isOwner = false;
    }
    
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title || '');
      setContent(foundNote.content || '');
      setHasEditPermission(isOwner || foundNote.permission === 'edit');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [noteId, userNotes, sharedNotes]);
  useEffect(() => {
    if (!note || !hasEditPermission) return;

    const saveTimer = setTimeout(async () => {
      if (title.trim()) {
        setSaving(true);
        try {
          const updatedNote = await notesService.updateNote(parseInt(noteId), {
            title: title.trim(),
            content: content
          });
          await updateNoteInContext(parseInt(noteId), {
            title: title.trim(),
            content: content,
            updatedAt: updatedNote?.updatedAt || new Date().toISOString().split('T')[0]
          });
          setLastSaved(new Date());
          setSaving(false);
        } catch (err) {
          console.error('Error saving note:', err);
          setSaving(false);
        }
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [title, content, noteId, note, updateNoteInContext, hasEditPermission]);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="editor-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="editor-error">
        <h3>Document not found</h3>
        <button className="btn btn-primary" onClick={handleBackClick}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <div className="editor-title-section">
          <button 
            className="btn btn-link back-btn" 
            onClick={handleBackClick}
            title="Back to Dashboard"
          >
            <i className="bi bi-chevron-left"></i> Back
          </button>
          <input
            type="text"
            className="editor-title-input"
            value={title}
            onChange={(e) => hasEditPermission && setTitle(e.target.value)}
            placeholder="Document title"
            disabled={!hasEditPermission}
          />
        </div>
        <div className="editor-status">
          {!hasEditPermission && (
            <span className="badge bg-warning">View Only</span>
          )}
          {saving && <span className="saving">Saving...</span>}
          {lastSaved && !saving && (
            <span className="saved">Saved {new Date(lastSaved).toLocaleTimeString()}</span>
          )}
        </div>
      </div>

      {!hasEditPermission && (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle"></i> You have view-only access to this document. Editing is not allowed.
        </div>
      )}

      <div className="editor-container">
        <textarea
          className="editor-textarea"
          value={content}
          onChange={(e) => hasEditPermission && setContent(e.target.value)}
          placeholder="Start typing your document here..."
          disabled={!hasEditPermission}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
