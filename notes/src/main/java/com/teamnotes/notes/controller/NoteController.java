package com.teamnotes.notes.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    @PostMapping("/share/{noteId}")
    public ResponseEntity<SharedNote> share(
            @PathVariable Long noteId,
            @RequestParam String email,
            @RequestParam PermissionType permission) {

        return ResponseEntity.ok(noteService.shareNote(noteId, email, permission));
    }
}
