package com.teamnotes.notes.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateNoteRequest {
    
    private String title;
    private String content;
}