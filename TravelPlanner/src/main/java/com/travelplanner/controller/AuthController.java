package com.travelplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.model.User;
import com.travelplanner.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = authService.login(user.getEmail(), user.getPassword());

        if (existingUser != null) {
            return "Login Successful";
        } else {
            return "Invalid Email or Password";
        }
    }
}