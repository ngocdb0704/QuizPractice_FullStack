package com.mav.fullStack_backend.repository;

import com.mav.fullStack_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
    public User findByMobile(String mobile);
    public Boolean existsByEmail(String email);
    public Boolean existsByMobile(String mobile);
}
