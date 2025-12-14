package com.teamnotes.notes.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamnotes.notes.dto.NoteResponse;
import com.teamnotes.notes.dto.SharedUserResponse;
import com.teamnotes.notes.dto.UpdateNoteRequest;
import com.teamnotes.notes.model.Note;
import com.teamnotes.notes.model.PermissionType;
import com.teamnotes.notes.model.SharedNote;
import com.teamnotes.notes.service.NoteService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {
	
	@Autowired
    private final NoteService noteService;

    @PostMapping("/create")
    public ResponseEntity<Note> createNote(@RequestBody Note note, Principal principal) {
        return ResponseEntity.ok(noteService.createNote(principal.getName(), note));
    }

    // share a note with another user
    @PostMapping("/share/{noteId}")
    public ResponseEntity<SharedNote> share(
            @PathVariable Long noteId,
            @RequestParam String email,
            @RequestParam PermissionType permission) {

        return ResponseEntity.ok(noteService.shareNote(noteId, email, permission));
    }
    
    // get all my notes
    @GetMapping("/my-notes")
    public ResponseEntity<List<NoteResponse>> getMyNotes(Principal principal) {
        List<NoteResponse> notes = noteService.getMyNotes(principal.getName());
        return ResponseEntity.ok(notes);
    }
    
    // get all the notes share with me
    @GetMapping("/shared-with-me")
    public ResponseEntity<List<NoteResponse>> getSharedNotes(Principal principal) {
        List<NoteResponse> notes = noteService.getSharedNotes(principal.getName());
        return ResponseEntity.ok(notes);
    }
    
    // get a specific note
    @GetMapping("/{noteId}")
    public ResponseEntity<NoteResponse> getNoteById(
            @PathVariable Long noteId, 
            Principal principal) {
        NoteResponse note = noteService.getNoteById(noteId, principal.getName());
        return ResponseEntity.ok(note);
    }
    
    //update a note only if the user is owner or has edit permission
    @PutMapping("/{noteId}")
    public ResponseEntity<Note> updateNote(
            @PathVariable Long noteId,
            @RequestBody UpdateNoteRequest request,
            Principal principal) {
        Note updatedNote = noteService.updateNote(noteId, request, principal.getName());
        return ResponseEntity.ok(updatedNote);
    }
    
    // delete a note
    @DeleteMapping("/{noteId}")
    public ResponseEntity<String> deleteNote(
            @PathVariable Long noteId,
            Principal principal) {
        noteService.deleteNote(noteId, principal.getName());
        return ResponseEntity.ok("Note deleted successfully");
    }
    
    // get all the users a note shared with 
    @GetMapping("/{noteId}/shared-users")
    public ResponseEntity<List<SharedUserResponse>> getSharedUsers(
            @PathVariable Long noteId,
            Principal principal) {
        List<SharedUserResponse> sharedUsers = noteService.getSharedUsers(noteId, principal.getName());
        return ResponseEntity.ok(sharedUsers);
    }
    
    // update permission for a user
    @PutMapping("/share/{noteId}")
    public ResponseEntity<SharedNote> updateSharePermission(
            @PathVariable Long noteId,
            @RequestParam String email,
            @RequestParam PermissionType permission,
            Principal principal) {
        SharedNote updated = noteService.updateSharePermission(noteId, email, permission, principal.getName());
        return ResponseEntity.ok(updated);
    }
    
    // remove access to a shared note
    @DeleteMapping("/share/{noteId}")
    public ResponseEntity<String> revokeAccess(
            @PathVariable Long noteId,
            @RequestParam String email,
            Principal principal) {
        noteService.revokeAccess(noteId, email, principal.getName());
        return ResponseEntity.ok("Access revoked successfully");
    }
}
