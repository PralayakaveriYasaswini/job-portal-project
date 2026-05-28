package com.jobportal.JobPortalBackend.service;

import com.jobportal.JobPortalBackend.model.User;
import com.jobportal.JobPortalBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // 🧾 REGISTER
    public String register(User user) {

        // 🔍 Check email already exists
        User existingUser = repo.findByEmail(user.getEmail());

        if (existingUser != null) {
            return "Email already exists";
        }

        // 🔒 Default role
        user.setRole("USER");

        repo.save(user);

        return "Registration successful";
    }

    // 🔐 LOGIN
    public User login(String email, String password) {

        User user = repo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Wrong password");
        }

        return user;
    }
    public User updateUser(Long id, User user) {

        User existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setSkills(user.getSkills());
        existing.setBio(user.getBio());

        // ⚠️ IMPORTANT: prevent null overwrite
        if (user.getProfileImage() != null) {
            existing.setProfileImage(user.getProfileImage());
        }

        if (user.getResume() != null) {
            existing.setResume(user.getResume());
        }

        return repo.save(existing);
    }

    public int getProfileCompletion(Long id){

        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int score = 0;

        if(user.getName() != null && !user.getName().isEmpty())
            score += 15;

        if(user.getEmail() != null && !user.getEmail().isEmpty())
            score += 15;

        if(user.getSkills() != null && !user.getSkills().isEmpty())
            score += 20;

        if(user.getBio() != null && !user.getBio().isEmpty())
            score += 20;

        if(user.getProfileImage() != null && !user.getProfileImage().isEmpty())
            score += 15;

        if(user.getResume() != null && !user.getResume().isEmpty())
            score += 15;

        return score;
    }
}