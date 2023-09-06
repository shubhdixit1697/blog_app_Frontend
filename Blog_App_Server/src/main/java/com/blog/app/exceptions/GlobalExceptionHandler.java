package com.blog.app.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.blog.app.payload.ResponseApi;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ResponseApi> resourcenotfoundException(ResourceNotFoundException ex){
		
		String message=ex.getMessage();
		ResponseApi responseApi=new ResponseApi(message,false);
		
		return new ResponseEntity<ResponseApi>(responseApi,HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> ArgnotValidException(MethodArgumentNotValidException ex){
		Map<String, String> map=new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldname=((FieldError)error).getField();
			String message= error.getDefaultMessage();
			map.put(fieldname, message);
		});
		return new ResponseEntity<Map<String,String>> (map,HttpStatus.BAD_REQUEST);
		
	}
}
