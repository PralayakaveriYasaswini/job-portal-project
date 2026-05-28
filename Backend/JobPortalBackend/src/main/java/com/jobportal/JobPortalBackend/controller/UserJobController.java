package com.jobportal.JobPortalBackend.controller;

import com.jobportal.JobPortalBackend.model.Job;
import com.jobportal.JobPortalBackend.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "*")
public class UserJobController {

    @Autowired
    private JobRepository jobRepository;

    // =========================
    // GET ALL JOBS
    // =========================

    @GetMapping
    public List<Job> getAllJobs(){

        return jobRepository.findAll();
    }

    // =========================
    // GET JOB BY ID
    // =========================

    @GetMapping("/{id}")
    public Job getJobById(
            @PathVariable Long id
    ){

        return jobRepository
                .findById(id)
                .orElse(null);
    }

    // =========================
    // ADD JOB
    // =========================

    @PostMapping
    public Job addJob(
            @RequestBody Job job
    ){

        return jobRepository.save(job);
    }

    // =========================
    // UPDATE JOB
    // =========================

    @PutMapping("/{id}")
    public Job updateJob(

            @PathVariable Long id,

            @RequestBody Job updatedJob
    ){

        Job job =
                jobRepository
                        .findById(id)
                        .orElseThrow();

        job.setTitle(updatedJob.getTitle());

        job.setCompany(updatedJob.getCompany());

        job.setLocation(updatedJob.getLocation());

        job.setSalary(updatedJob.getSalary());

        job.setDescription(updatedJob.getDescription());

        return jobRepository.save(job);
    }

    // =========================
    // DELETE JOB
    // =========================

    @DeleteMapping("/{id}")
    public String deleteJob(
            @PathVariable Long id
    ){

        jobRepository.deleteById(id);

        return "Job Deleted Successfully";
    }
}