package com.teamnotes.notes.model;


import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "shared_notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SharedNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "note_id")
    private Note note;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private PermissionType permission; // VIEW or EDIT

    private LocalDateTime sharedAt;
}
