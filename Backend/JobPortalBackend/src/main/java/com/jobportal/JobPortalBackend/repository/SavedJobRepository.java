package com.jobportal.JobPortalBackend.repository;

import com.jobportal.JobPortalBackend.model.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository
        extends JpaRepository<SavedJob, Long> {

    List<SavedJob> findByUserId(Long userId);
    List<SavedJob> findByUserIdAndJobId(
            Long userId,
            Long jobId
    );
}