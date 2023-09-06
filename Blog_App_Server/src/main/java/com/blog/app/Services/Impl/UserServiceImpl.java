package com.blog.app.Services.Impl;


import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.app.Services.UserService;
import com.blog.app.entities.User;
import com.blog.app.exceptions.ResourceNotFoundException;
import com.blog.app.payload.UserDto;
import com.blog.app.repos.UserRepo;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDto createUser(UserDto userdto) {
		
		User user=this.dtoToUser(userdto);
		
		User savedUser=this.userRepo.save(user);
		
		return this.userToDto(savedUser);
	}

	@Override
	public UserDto updtaeUser(UserDto userDto, Integer userId) {
		
		User user= this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User"," id ",userId));
		user.setAbout(userDto.getAbout());
		user.setEmail(userDto.getEmail());
		user.setName(userDto.getName());
		user.setPassword(userDto.getPassword());
		
		User savedUser=this.userRepo.save(user);
		return this.userToDto(savedUser);
	}

	@Override
	public Void deleteUser(Integer userId) {
		User user= this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User"," id ",userId));
		this.userRepo.delete(user);
		return null;
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User user= this.userRepo.findById(userId).
				orElseThrow(() -> new ResourceNotFoundException("User"," id ",userId));
		
		return this.userToDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		
		List<User> users=this.userRepo.findAll();
		
		List<UserDto> userDtos= users.stream().map(user -> userToDto(user)).collect(Collectors.toList());
		
		return userDtos;
	}
	
	 User dtoToUser(UserDto userDto){
		
		User user=this.modelMapper.map(userDto,User.class);
//		user.setAbout(userDto.getAbout());
//		user.setEmail(userDto.getEmail());
//		user.setId(userDto.getId());
//		user.setName(userDto.getName());
//		user.setId(userDto.getId());
		
		return user;
		
	}
	
     UserDto userToDto(User user){
		
		UserDto userd=this.modelMapper.map(user,UserDto.class);
		
//		userd.setAbout(user.getAbout());
//		userd.setEmail(user.getEmail());
//		userd.setId(user.getId());
//		userd.setName(user.getName());
//		userd.setId(user.getId());
//		
		return userd;
		
	}
	
	

}
