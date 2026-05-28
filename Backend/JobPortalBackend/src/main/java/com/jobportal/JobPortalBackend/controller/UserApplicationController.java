package com.jobportal.JobPortalBackend.controller;

import com.jobportal.JobPortalBackend.model.Application;
import com.jobportal.JobPortalBackend.service.ApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "*")
public class UserApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // APPLY JOB
    @PostMapping
    public String applyJob(
            @RequestParam Long userId,
            @RequestParam Long jobId
    ){

        return applicationService.applyJob(userId, jobId);
    }

    // GET USER APPLICATIONS
    @GetMapping("/user/{userId}")
    public List<Application> getUserApplications(
            @PathVariable Long userId
    ){
        return applicationService.getUserApplications(userId);
    }

    // ADMIN ALL
    @GetMapping
    public List<Application> getAllApplications(){
        return applicationService.getAll();
    }

    // UPDATE STATUS
    @PutMapping("/{id}")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ){
        return applicationService.updateStatus(id, status);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id){
        applicationService.deleteApplication(id);
        return "Deleted Successfully";
    }
}