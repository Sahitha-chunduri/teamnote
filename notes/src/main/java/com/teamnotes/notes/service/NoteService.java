package com.teamnotes.notes.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamnotes.notes.dto.NoteResponse;
import com.teamnotes.notes.dto.SharedUserResponse;
import com.teamnotes.notes.dto.UpdateNoteRequest;
import com.teamnotes.notes.model.Note;
import com.teamnotes.notes.model.PermissionType;
import com.teamnotes.notes.model.SharedNote;
import com.teamnotes.notes.model.User;
import com.teamnotes.notes.repository.NoteRepository;
import com.teamnotes.notes.repository.SharedNoteRepository;
import com.teamnotes.notes.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class NoteService {
	@Autowired
    private UserRepository userRepository;

	@Autowired
	private NoteRepository noteRepository;
	@Autowired
	private SharedNoteRepository sharedNoteRepository;
	
	// create a new note
	public Note createNote(String email, Note note) {
		User owner = userRepository.findByEmail(email).orElseThrow();
	    note.setOwner(owner);
	    note.setCreatedAt(LocalDateTime.now());
	    note.setUpdatedAt(LocalDateTime.now());
	    return noteRepository.save(note);
	}
	
	// share notes with another user
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
	
	// get all the notes owned
	public List<NoteResponse> getMyNotes(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Note> notes = noteRepository.findByOwner(user);
        
        return notes.stream()
            .map(note -> NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .ownerName(note.getOwner().getName())
                .ownerEmail(note.getOwner().getEmail())
                .isOwner(true)
                .permission(PermissionType.EDIT) 
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .build())
            .collect(Collectors.toList());
    }
	
	// get the notes shared with user
	public List<NoteResponse> getSharedNotes(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<SharedNote> sharedNotes = sharedNoteRepository.findByUser(user);
        
        return sharedNotes.stream()
            .map(shared -> {
                Note note = shared.getNote();
                return NoteResponse.builder()
                    .id(note.getId())
                    .title(note.getTitle())
                    .content(note.getContent())
                    .ownerName(note.getOwner().getName())
                    .ownerEmail(note.getOwner().getEmail())
                    .isOwner(false)
                    .permission(shared.getPermission())
                    .createdAt(note.getCreatedAt())
                    .updatedAt(note.getUpdatedAt())
                    .build();
            })
            .collect(Collectors.toList());
    }
	
	// get a notes by id
	public NoteResponse getNoteById(Long noteId, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new RuntimeException("Note not found"));
        
        if (note.getOwner().getEmail().equals(email)) {
            return NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .ownerName(note.getOwner().getName())
                .ownerEmail(note.getOwner().getEmail())
                .isOwner(true)
                .permission(PermissionType.EDIT)
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .build();
        }
        
        SharedNote sharedNote = sharedNoteRepository.findByNoteAndUser(note, user)
            .orElseThrow(() -> new RuntimeException("You don't have access to this note"));
        
        return NoteResponse.builder()
            .id(note.getId())
            .title(note.getTitle())
            .content(note.getContent())
            .ownerName(note.getOwner().getName())
            .ownerEmail(note.getOwner().getEmail())
            .isOwner(false)
            .permission(sharedNote.getPermission())
            .createdAt(note.getCreatedAt())
            .updatedAt(note.getUpdatedAt())
            .build();
    }
	
	// update a notes title or content for owner or have edit access
	 @Transactional
	    public Note updateNote(Long noteId, UpdateNoteRequest request, String email) {
	        User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	        
	        Note note = noteRepository.findById(noteId)
	            .orElseThrow(() -> new RuntimeException("Note not found"));
	        
	        boolean isOwner = note.getOwner().getEmail().equals(email);
	        
	        if (!isOwner) {
	            SharedNote sharedNote = sharedNoteRepository.findByNoteAndUser(note, user)
	                .orElseThrow(() -> new RuntimeException("You don't have access to this note"));
	            
	            if (sharedNote.getPermission() != PermissionType.EDIT) {
	                throw new RuntimeException("You don't have permission to edit this note. You only have VIEW access.");
	            }
	        }
	        
	        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
	            note.setTitle(request.getTitle());
	        }
	        if (request.getContent() != null) {
	            note.setContent(request.getContent());
	        }
	        note.setUpdatedAt(LocalDateTime.now());
	        
	        return noteRepository.save(note);
	    }
	
	// delete a note if owner only
	 @Transactional
	    public void deleteNote(Long noteId, String email) {
	        Note note = noteRepository.findById(noteId)
	            .orElseThrow(() -> new RuntimeException("Note not found"));
	        
	        if (!note.getOwner().getEmail().equals(email)) {
	            throw new RuntimeException("Only the owner can delete this note");
	        }
	        
	        List<SharedNote> sharedNotes = sharedNoteRepository.findByNote(note);
	        sharedNoteRepository.deleteAll(sharedNotes);
	        
	        noteRepository.delete(note);
	    }
	 
	 // get all the users a note is share with 
	 public List<SharedUserResponse> getSharedUsers(Long noteId, String ownerEmail) {
	        Note note = noteRepository.findById(noteId)
	            .orElseThrow(() -> new RuntimeException("Note not found"));
	        
	        if (!note.getOwner().getEmail().equals(ownerEmail)) {
	            throw new RuntimeException("Only the owner can view who has access to this note");
	        }
	        
	        List<SharedNote> sharedNotes = sharedNoteRepository.findByNote(note);
	        
	        return sharedNotes.stream()
	            .map(shared -> SharedUserResponse.builder()
	                .sharedNoteId(shared.getId())
	                .userId(shared.getUser().getId())
	                .userName(shared.getUser().getName())
	                .userEmail(shared.getUser().getEmail())
	                .permission(shared.getPermission())
	                .sharedAt(shared.getSharedAt())
	                .build())
	            .collect(Collectors.toList());
	    }
	
	 // update share permission
	 @Transactional
	    public SharedNote updateSharePermission(Long noteId, String sharedEmail, PermissionType permission, String ownerEmail) {
	        Note note = noteRepository.findById(noteId)
	            .orElseThrow(() -> new RuntimeException("Note not found"));
	        
	        if (!note.getOwner().getEmail().equals(ownerEmail)) {
	            throw new RuntimeException("Only the owner can update permissions");
	        }
	        
	        User user = userRepository.findByEmail(sharedEmail)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	        
	        SharedNote sharedNote = sharedNoteRepository.findByNoteAndUser(note, user)
	            .orElseThrow(() -> new RuntimeException("Note is not shared with this user"));
	        
	        sharedNote.setPermission(permission);
	        return sharedNoteRepository.save(sharedNote);
	    }
	 
	 // remove users access to a note
	 @Transactional
	    public void revokeAccess(Long noteId, String sharedEmail, String ownerEmail) {
	        Note note = noteRepository.findById(noteId)
	            .orElseThrow(() -> new RuntimeException("Note not found"));
	        
	        if (!note.getOwner().getEmail().equals(ownerEmail)) {
	            throw new RuntimeException("Only the owner can revoke access");
	        }
	        
	        User user = userRepository.findByEmail(sharedEmail)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	        
	        SharedNote sharedNote = sharedNoteRepository.findByNoteAndUser(note, user)
	            .orElseThrow(() -> new RuntimeException("Note is not shared with this user"));
	        
	        sharedNoteRepository.delete(sharedNote);
	    }
}
