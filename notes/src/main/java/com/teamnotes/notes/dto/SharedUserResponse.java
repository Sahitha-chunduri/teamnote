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
public class SharedUserResponse {
    
    private Long sharedNoteId;
    private Long userId;
    private String userName;
    private String userEmail;
    private PermissionType permission;    
    private LocalDateTime sharedAt;
}