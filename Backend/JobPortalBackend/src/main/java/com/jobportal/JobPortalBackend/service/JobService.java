package com.jobportal.JobPortalBackend.service;

import com.jobportal.JobPortalBackend.model.Job;
import com.jobportal.JobPortalBackend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository repo;

    public Job addJob(Job job) {
        return repo.save(job);
    }

    public List<Job> getJobs() {
        return repo.findAll();
    }

    public Job updateJob(Long id, Job job) {
        Job j = repo.findById(id).orElseThrow();

        j.setTitle(job.getTitle());
        j.setCompany(job.getCompany());
        j.setDescription(job.getDescription());
        j.setLocation(job.getLocation());
        j.setSalary(job.getSalary());

        return repo.save(j);
    }

    public void deleteJob(Long id) {
        repo.deleteById(id);
    }
}