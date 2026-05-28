package com.jobportal.JobPortalBackend.service;

import com.jobportal.JobPortalBackend.model.Job;
import com.jobportal.JobPortalBackend.model.SavedJob;
import com.jobportal.JobPortalBackend.model.User;
import com.jobportal.JobPortalBackend.repository.JobRepository;
import com.jobportal.JobPortalBackend.repository.SavedJobRepository;
import com.jobportal.JobPortalBackend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // SAVE JOB
    public String saveJob(Long userId, Long jobId){

        User user =
                userRepository.findById(userId)
                        .orElseThrow();

        Job job =
                jobRepository.findById(jobId)
                        .orElseThrow();

        // CHECK ALREADY SAVED

        List<SavedJob> existing =
                savedJobRepository
                        .findByUserIdAndJobId(userId, jobId);

        if(!existing.isEmpty()){

            return "Job already saved";
        }

        SavedJob savedJob =
                new SavedJob();

        savedJob.setUser(user);

        savedJob.setJob(job);

        savedJobRepository.save(savedJob);

        return "Job Saved Successfully";
    }

    // GET USER SAVED JOBS

    public List<SavedJob> getUserSavedJobs(Long userId){

        return savedJobRepository
                .findByUserId(userId);
    }

    // DELETE

    public void deleteSavedJob(Long id){

        savedJobRepository.deleteById(id);
    }
}