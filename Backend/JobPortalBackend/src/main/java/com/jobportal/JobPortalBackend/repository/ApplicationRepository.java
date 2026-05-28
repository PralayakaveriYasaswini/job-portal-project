package com.jobportal.JobPortalBackend.repository;

import com.jobportal.JobPortalBackend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    List<Application> findByUserId(Long userId);
    boolean existsByUserIdAndJobId(Long userId, Long jobId);
}