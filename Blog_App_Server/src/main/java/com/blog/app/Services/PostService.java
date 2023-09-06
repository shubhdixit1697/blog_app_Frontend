package com.blog.app.Services;

import java.util.List;

import com.blog.app.entities.Post;
import com.blog.app.payload.PostDto;
import com.blog.app.payload.PostResponse;

public interface PostService  {
	
	PostDto createPost(PostDto postDto,Integer userId, Integer categoryId);
	PostDto updatePost(PostDto postDto,Integer postId);
	Void deletePost(Integer postId);
	PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy);
	PostDto getPostByPostId(Integer postId);
	List<PostDto> getAllPostByCategory(Integer categoryId);
	List<PostDto> getAllPostByUser(Integer userId);
	List<PostDto> searchPosts(String keyword);

}
