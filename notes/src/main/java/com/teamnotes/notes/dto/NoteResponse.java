package com.teamnotes.notes.dto;

import java.time.LocalDateTime;
import com.teamnotes.notes.model.PermissionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoteResponse {
    
    private Long id;
    private String title;
    private String content;
    private String ownerName;
    private String ownerEmail;
    private boolean isOwner;
    private PermissionType permission;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}