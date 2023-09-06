package com.blog.app.Controller;

import org.aspectj.weaver.NewConstructorTypeMunger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.app.Services.CommentService;
import com.blog.app.payload.CommentDto;
import com.blog.app.payload.ResponseApi;

@RestController
@RequestMapping("/api/")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@PostMapping("posts/{postId}/comments")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto,@PathVariable Integer postId){
		
		CommentDto createdComment=this.commentService.createComment(commentDto, postId);
		return new ResponseEntity<CommentDto>(createdComment,HttpStatus.CREATED);
		
	}
	
	@DeleteMapping("/comments/{commentId}")
	public ResponseEntity<ResponseApi> deleteComment(@PathVariable Integer commentId){
		
		this.commentService.deleteComment(commentId);
		return new ResponseEntity<ResponseApi>(new ResponseApi("Successfully Deleted",true),HttpStatus.OK);
		
	}

}
