package com.mav.fullStack_backend.controller;

import com.mav.fullStack_backend.enums.Role;
import com.mav.fullStack_backend.enums.Status;
import com.mav.fullStack_backend.exception.UserNotFoundException;
import com.mav.fullStack_backend.model.User;
import com.mav.fullStack_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.EnumSet;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFullName(updatedUser.getFullName());
                    user.setEmail(updatedUser.getEmail());
                    user.setGender(updatedUser.getGender());
                    user.setRole(updatedUser.getRole());
                    user.setMobile(updatedUser.getMobile());
                    user.setStatus(updatedUser.getStatus());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    void deleteUser(@PathVariable Long id) {
        if(!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }

    @GetMapping("/user/roles")
    EnumSet<Role> getRolesList(){
        return EnumSet.allOf(Role.class);
    }

    @GetMapping("/user/status")
    EnumSet<Status> getStatusList(){
        return EnumSet.allOf(Status.class);
    }

    @GetMapping("/user/email/{email}")
    User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

}
