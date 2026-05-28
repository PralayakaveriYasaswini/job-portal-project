package com.jobportal.JobPortalBackend.repository;

import com.jobportal.JobPortalBackend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {

}
