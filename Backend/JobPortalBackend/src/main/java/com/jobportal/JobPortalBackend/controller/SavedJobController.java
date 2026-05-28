package com.jobportal.JobPortalBackend.controller;

import com.jobportal.JobPortalBackend.model.SavedJob;
import com.jobportal.JobPortalBackend.service.SavedJobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/saved-jobs")

@CrossOrigin("*")
public class SavedJobController {

    @Autowired
    private SavedJobService service;

    // SAVE JOB

    @PostMapping("/save")
    public String saveJob(

            @RequestParam Long userId,

            @RequestParam Long jobId){

        return service.saveJob(userId, jobId);
    }

    // USER SAVED JOBS

    @GetMapping("/user/{userId}")
    public List<SavedJob> getUserSavedJobs(
            @PathVariable Long userId){

        return service.getUserSavedJobs(userId);
    }

    // DELETE

    @DeleteMapping("/{id}")
    public void deleteSavedJob(
            @PathVariable Long id){

        service.deleteSavedJob(id);
    }
}