package com.blog.app.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.app.entities.User;

public interface UserRepo extends JpaRepository<User, Integer> {
	
	Optional<User> findByEmail(String email);

}
