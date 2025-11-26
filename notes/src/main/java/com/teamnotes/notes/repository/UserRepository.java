package com.teamnotes.notes.repository;

import com.teamnotes.notes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findById(Long id);
    boolean existsByEmailAndIdNot(String email, Long id);
    List<User> findByNameContainingIgnoreCase(String name);
    List<User> findByIdIn(List<Long> userIds);
}



