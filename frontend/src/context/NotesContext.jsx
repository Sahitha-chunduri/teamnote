import React, { createContext, useState, useEffect } from 'react';
import { notesService } from '../services/api';
import { mockUserNotes, mockSharedNotes } from '../data/mockData';
import { useAuth } from './AuthContext';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [userNotes, setUserNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserNotes();
    } else {
      setUserNotes([]);
      setSharedNotes([]);
      setLoading(false);
      setError(null);
    }
  }, [isAuthenticated]);

  const fetchUserNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const notes = await notesService.getUserNotes();
      const shared = await notesService.getSharedNotes();
      setUserNotes(Array.isArray(notes) ? notes : []);
      setSharedNotes(Array.isArray(shared) ? shared : []);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      setError('Failed to load documents from server — using local mock data');
      setUserNotes(mockUserNotes);
      setSharedNotes(mockSharedNotes);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title, description) => {
    try {
      const newNote = await notesService.createNote(title, description);
      setUserNotes([...userNotes, newNote]);
      return newNote;
    } catch (err) {
      console.error('Error creating note:', err);
      setError('Failed to create document');
      throw err;
    }
  };

  const updateNote = async (id, updates) => {
    try {
      setUserNotes(userNotes.map(note =>
        note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : note
      ));
    } catch (err) {
      console.error('Error updating note:', err);
      setError('Failed to update document');
      throw err;
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesService.deleteNote(id);
      setUserNotes(userNotes.filter(note => note.id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete document');
      throw err;
    }
  };

  const shareNoteWithUser = async (noteId, userId, email, name, permission = 'view') => {
    try {
      const shared = await notesService.shareNote(noteId, email, permission);

      setUserNotes(userNotes.map(note => {
        if (note.id === noteId) {
          const existingShare = note.sharedWith?.find(s => s.email === (shared?.user?.email || email));
          if (existingShare) {
            return {
              ...note,
              sharedWith: note.sharedWith.map(s =>
                s.email === (shared?.user?.email || email) ? { ...s, permission: shared?.permission || permission } : s
              )
            };
          }

          const newShare = {
            id: shared?.user?.id || userId || Date.now(),
            email: shared?.user?.email || email,
            name: shared?.user?.name || name || email,
            permission: shared?.permission || permission
          };

          return {
            ...note,
            sharedWith: [...(note.sharedWith || []), newShare]
          };
        }
        return note;
      }));
    } catch (err) {
      console.error('Error sharing note:', err);
      const errorMsg = err.message || 'Failed to share document';
      setError(errorMsg);
      throw err;
    }
  };

  const removeNoteShare = async (noteId, userId) => {
    try {
      setUserNotes(userNotes.map(note =>
        note.id === noteId
          ? { ...note, sharedWith: note.sharedWith.filter(s => s.id !== userId) }
          : note
      ));
    } catch (err) {
      console.error('Error removing share:', err);
      setError('Failed to remove share');
      throw err;
    }
  };

  const value = {
    userNotes,
    sharedNotes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    shareNoteWithUser,
    removeNoteShare,
    refetchNotes: fetchUserNotes
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => {
  const context = React.useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};
