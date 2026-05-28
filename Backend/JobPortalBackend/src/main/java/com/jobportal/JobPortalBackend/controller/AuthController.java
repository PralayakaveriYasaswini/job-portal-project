package com.jobportal.JobPortalBackend.controller;


import com.jobportal.JobPortalBackend.model.User;
import com.jobportal.JobPortalBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    // 🧾 REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.register(user);
    }

    // 🔐 LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        return userService.login(
                user.getEmail(),
                user.getPassword()
        );
    }
}