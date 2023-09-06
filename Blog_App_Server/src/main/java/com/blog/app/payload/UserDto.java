package com.blog.app.payload;



import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {
	
	
	private int id;
	@NotEmpty
	@Size(min=4,message="Please enter name")
	private String name;
	
	@NotNull
	@Size(min=6,max=12,message="Password must be of max 12 and min 3 char")
	private String password;
	
	@Email(message="Please Enter valid email address")
	private String email;
	
	@NotNull
	@Size(min=10,message="Please enter some comments")
	private String about;
	
	

}
