package com.blog.app.payload;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.blog.app.entities.Post;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
	
	
	private int Id;
	private String content;
	

}
