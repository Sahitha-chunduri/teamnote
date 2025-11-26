package com.teamnotes.notes.service;

import com.teamnotes.notes.dto.LoginRequest;
import com.teamnotes.notes.dto.RegisterRequest;
import com.teamnotes.notes.dto.AuthResponse;


public interface UserService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
