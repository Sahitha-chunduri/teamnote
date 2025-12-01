package com.teamnotes.notes.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
