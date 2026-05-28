package com.jobportal.JobPortalBackend.service;

import com.jobportal.JobPortalBackend.model.Application;
import com.jobportal.JobPortalBackend.model.Job;
import com.jobportal.JobPortalBackend.model.User;
import com.jobportal.JobPortalBackend.repository.ApplicationRepository;
import com.jobportal.JobPortalBackend.repository.JobRepository;
import com.jobportal.JobPortalBackend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // APPLY JOB

    public String applyJob(Long userId, Long jobId){

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // ❌ VALIDATION 1: Resume check
        if(user.getResume() == null || user.getResume().isEmpty()){
            return "ERROR: Upload resume before applying";
        }

        // ❌ VALIDATION 2: Prevent duplicate apply
        boolean alreadyApplied =
                applicationRepository.existsByUserIdAndJobId(userId, jobId);

        if(alreadyApplied){
            return "ERROR: You already applied for this job";
        }

        // ✅ SAVE APPLICATION
        Application app = new Application();
        app.setUser(user);
        app.setJob(job);
        app.setStatus("APPLIED");

        applicationRepository.save(app);

        return "Applied Successfully";
    }

    // GET USER APPLICATIONS
    public List<Application> getUserApplications(Long userId){

        List<Application> apps =
                applicationRepository.findByUserId(userId);

        return apps;
    }

    // GET ALL
    public List<Application> getAll(){
        return applicationRepository.findAll();
    }

    // UPDATE STATUS
    public Application updateStatus(Long id, String status){

        Application app =
                applicationRepository.findById(id)
                        .orElseThrow();

        app.setStatus(status);

        return applicationRepository.save(app);
    }

    // DELETE
    public void deleteApplication(Long id){
        applicationRepository.deleteById(id);
    }
}