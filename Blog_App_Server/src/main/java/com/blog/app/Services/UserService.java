package com.blog.app.Services;

import java.util.List;

import com.blog.app.payload.UserDto;



public interface UserService {
	
	UserDto createUser(UserDto user);
	
	UserDto updtaeUser(UserDto user, Integer userId);
	
	Void deleteUser(Integer userId);
	
	UserDto getUserById(Integer userId);
	
	List<UserDto> getAllUsers();

}
