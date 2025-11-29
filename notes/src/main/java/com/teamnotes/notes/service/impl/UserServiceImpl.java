package com.teamnotes.notes.service.impl;


import com.teamnotes.notes.dto.AuthResponse;
import com.teamnotes.notes.dto.LoginRequest;
import com.teamnotes.notes.dto.RegisterRequest;
import com.teamnotes.notes.model.User;
import com.teamnotes.notes.repository.UserRepository;
import com.teamnotes.notes.security.JwtUtil;
import com.teamnotes.notes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId(),user.getEmail());

        return new AuthResponse(
                token,
                new AuthResponse.UserInfo(user.getId(), user.getName(), user.getEmail())
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail());

        return new AuthResponse(
                token,
                new AuthResponse.UserInfo(user.getId(), user.getName(), user.getEmail())
        );
    }
}
