package com.travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelplanner.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}