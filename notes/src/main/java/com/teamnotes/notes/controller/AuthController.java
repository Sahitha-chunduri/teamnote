package com.teamnotes.notes.controller;


import com.teamnotes.notes.dto.AuthResponse;
import com.teamnotes.notes.dto.LoginRequest;
import com.teamnotes.notes.dto.RegisterRequest;
import com.teamnotes.notes.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties.ShowSummaryOutput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
        	System.out.println("Request received");
            AuthResponse response = userService.register(request);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = userService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }
}
