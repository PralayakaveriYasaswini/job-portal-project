package com.jobportal.JobPortalBackend.controller;

import com.jobportal.JobPortalBackend.model.User;
import com.jobportal.JobPortalBackend.repository.UserRepository;
import com.jobportal.JobPortalBackend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserService service;   // ✅ MUST be like this


    // GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // UPDATE USER
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }

    // IMAGE UPLOAD
    @PostMapping(
            value = "/{id}/upload-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public String uploadImage(
            @PathVariable Long id,
            @RequestPart("file") MultipartFile file
    ) {

        try {

            // FIND USER
            User user = userRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("User not found"));

            // GET FILE NAME
            String fileName =
                    file.getOriginalFilename();

            // VALIDATION
            if (fileName == null) {

                return "Invalid file";
            }

            // ONLY JPG PNG JPEG
            if (!(fileName.toLowerCase().endsWith(".png")
                    || fileName.toLowerCase().endsWith(".jpg")
                    || fileName.toLowerCase().endsWith(".jpeg"))) {

                return "Only PNG, JPG, JPEG allowed";
            }

            // UPLOAD FOLDER
            String uploadDir =
                    System.getProperty("user.dir")
                            + "/uploads/profile-images/";

            File dir = new File(uploadDir);

            // CREATE FOLDER IF NOT EXISTS
            if (!dir.exists()) {

                dir.mkdirs();
            }

            // DELETE OLD IMAGE
            if (user.getProfileImage() != null) {

                File oldImage = new File(
                        uploadDir + user.getProfileImage()
                );

                if (oldImage.exists()) {

                    oldImage.delete();
                }
            }

            // CREATE UNIQUE FILE NAME
            String savedFile =
                    System.currentTimeMillis()
                            + "_" +
                            fileName;

            // SAVE IMAGE
            file.transferTo(
                    new File(uploadDir + savedFile)
            );

            // SAVE DB
            user.setProfileImage(savedFile);

            userRepository.save(user);

            return "Image Uploaded Successfully";

        } catch (Exception e) {

            return "ERROR: " + e.getMessage();
        }
    }

    @GetMapping("/{id}/completion")
    public int getProfileCompletion(@PathVariable Long id) {

        return service.getProfileCompletion(id);
    }

    // RESUME UPLOAD
    @PostMapping(
            value = "/{id}/upload-resume",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public String uploadResume(
            @PathVariable Long id,
            @RequestPart("file") MultipartFile file
    ) {

        try {

            // FIND USER
            User user = userRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("User not found"));

            // GET FILE NAME
            String fileName =
                    file.getOriginalFilename();

            // VALIDATION
            if (fileName == null) {

                return "Invalid file";
            }

            // ONLY PDF
            if (!fileName.toLowerCase().endsWith(".pdf")) {

                return "Only PDF allowed";
            }

            // UPLOAD FOLDER
            String uploadDir =
                    System.getProperty("user.dir")
                            + "/uploads/resumes/";

            File dir = new File(uploadDir);

            // CREATE FOLDER IF NOT EXISTS
            if (!dir.exists()) {

                dir.mkdirs();
            }

            // DELETE OLD RESUME
            if (user.getResume() != null) {

                File oldResume = new File(
                        uploadDir + user.getResume()
                );

                if (oldResume.exists()) {

                    oldResume.delete();
                }
            }

            // CREATE UNIQUE FILE NAME
            String savedFile =
                    System.currentTimeMillis()
                            + "_" +
                            fileName;

            // SAVE RESUME
            file.transferTo(
                    new File(uploadDir + savedFile)
            );

            // SAVE DB
            user.setResume(savedFile);

            userRepository.save(user);

            return "Resume Uploaded Successfully";

        } catch (Exception e) {

            return "ERROR: " + e.getMessage();
        }
    }
}