package com.blog.app.Services.Impl;

import org.hibernate.loader.plan.build.internal.returns.AbstractCompositeEntityIdentifierDescription;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.app.Services.CommentService;
import com.blog.app.entities.Comment;
import com.blog.app.entities.Post;
import com.blog.app.exceptions.ResourceNotFoundException;
import com.blog.app.payload.CommentDto;
import com.blog.app.repos.CommentRepo;
import com.blog.app.repos.PostRepo;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PostRepo postRepo;
	
	@Autowired
	private CommentRepo commentRepo;
	
	@Override
	public CommentDto createComment(CommentDto commentDto, Integer postId) {
		Post post=this.postRepo.findById(postId).orElseThrow(()-> new ResourceNotFoundException("Post","PostId", postId));
		Comment comment=this.modelMapper.map(commentDto, Comment.class);
		comment.setPost(post);
		Comment saved=this.commentRepo.save(comment); 
		return this.modelMapper.map(saved,CommentDto.class);
	}

	@Override
	public void deleteComment(Integer commentId) {
		Comment comment=this.commentRepo.findById(commentId).orElseThrow(()-> new ResourceNotFoundException("Comment","CommentId", commentId));
		this.commentRepo.delete(comment);

	}

}
