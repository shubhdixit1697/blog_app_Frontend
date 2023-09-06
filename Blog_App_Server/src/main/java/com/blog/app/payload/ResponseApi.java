package com.blog.app.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ResponseApi {
	
	private String message;
	private boolean success;
	

}
