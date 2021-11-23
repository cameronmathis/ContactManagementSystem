package com.contactManagementSystem.controller;

import com.contactManagementSystem.exception.ResourceNotFoundException;
import com.contactManagementSystem.model.User;
import com.contactManagementSystem.repository.UserRepository;
import com.contactManagementSystem.utils.PasswordUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    private PasswordUtil passwordUtil;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable(value = "username") String username)
            throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this username :: " + username));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public User createUser(@Valid @RequestBody User user) {
        user.setUsername(user.getUsername());
        user.setPassword(passwordUtil.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @PutMapping("/users/{username}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "username") String username,
            @Valid @RequestBody User userDetails) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this username :: " + username));

        user.setUsername(userDetails.getUsername());
        user.setPassword(passwordUtil.encode(userDetails.getPassword()));
        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{username}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") String username)
            throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this username :: " + username));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
