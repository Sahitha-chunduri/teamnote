package com.teamnotes.notes.service;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamnotes.notes.model.Note;
import com.teamnotes.notes.model.PermissionType;
import com.teamnotes.notes.model.SharedNote;
import com.teamnotes.notes.model.User;
import com.teamnotes.notes.repository.NoteRepository;
import com.teamnotes.notes.repository.SharedNoteRepository;
import com.teamnotes.notes.repository.UserRepository;

@Service
public class NoteService {
	@Autowired
    private UserRepository userRepository;

	@Autowired
	private NoteRepository noteRepository;
	@Autowired
	private SharedNoteRepository sharedNoteRepository;
	
	public Note createNote(String email, Note note) {
		User owner = userRepository.findByEmail(email).orElseThrow();
	    note.setOwner(owner);
	    note.setCreatedAt(LocalDateTime.now());
	    note.setUpdatedAt(LocalDateTime.now());
	    return noteRepository.save(note);
	}
	
	public SharedNote shareNote(Long noteId, String sharedEmail, PermissionType permission) {
	    Note note = noteRepository.findById(noteId).orElseThrow();
	    User user = userRepository.findByEmail(sharedEmail).orElseThrow();

	    SharedNote sharedNote = new SharedNote();
	    sharedNote.setNote(note);
	    sharedNote.setUser(user);
	    sharedNote.setPermission(permission);
	    sharedNote.setSharedAt(LocalDateTime.now());
	    return sharedNoteRepository.save(sharedNote);
	}

}
