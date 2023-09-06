package com.blog.app.Controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.app.Services.UserService;
import com.blog.app.payload.ResponseApi;
import com.blog.app.payload.UserDto;

@RestController
@RequestMapping("/api/users")
public class Controller {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/")
	private ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto){
		
		UserDto createDto= this.userService.createUser(userDto);
		return new ResponseEntity<>(createDto,HttpStatus.CREATED);
		
	}
	
	@PutMapping("/{userId}") //path uri variable
	private ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable Integer userId){
		
		UserDto updateDto=this.userService.updtaeUser(userDto, userId);
		return ResponseEntity.ok(updateDto);
		
	}
	
	@DeleteMapping("/{userId}")
	private ResponseEntity<ResponseApi> deleteUser(@PathVariable Integer userId){
		
		this.userService.deleteUser(userId);
		return new ResponseEntity<ResponseApi>(new ResponseApi("User Deleted",true),HttpStatus.OK);
		
	}
	
	@GetMapping("/")
	private ResponseEntity<List<UserDto>> getAllUsers(){
		
		return ResponseEntity.ok(this.userService.getAllUsers());
	}
	
	@GetMapping("/{userId}")
    private ResponseEntity<UserDto> singleUser(@PathVariable Integer userId){
		
	    return ResponseEntity.ok(this.userService.getUserById(userId));
		
	}

	
}
