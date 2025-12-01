package com.teamnotes.notes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teamnotes.notes.model.Note;
import com.teamnotes.notes.model.User;
import java.util.*;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByOwner(User owner);
}
