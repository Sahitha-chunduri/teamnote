package com.teamnotes.notes.repository;

import com.teamnotes.notes.model.Note;
import com.teamnotes.notes.model.SharedNote;
import com.teamnotes.notes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;


public interface SharedNoteRepository extends JpaRepository<SharedNote, Long> {
    List<SharedNote> findByUser(User user);
    Optional<SharedNote> findByNoteAndUser(Note note, User user);
}
