package com.blog.app.payload;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {
	

	private int categoryId;
	
	@NotBlank
	@Size(min=4,message="Please enter name of min 4 characters")
	private String categoryTitleString;

	@NotBlank
	@Size(min=10,message="Please Description of min 10 characters")
	private String categorydescription;


}
