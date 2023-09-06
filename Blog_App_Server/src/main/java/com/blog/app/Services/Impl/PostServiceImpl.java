package com.blog.app.Services.Impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.naming.ldap.PagedResultsResponseControl;
import org.springframework.data.domain.Sort;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.blog.app.Services.PostService;
import com.blog.app.entities.Category;
import com.blog.app.entities.Post;
import com.blog.app.entities.User;
import com.blog.app.exceptions.ResourceNotFoundException;
import com.blog.app.payload.CategoryDto;
import com.blog.app.payload.PostDto;
import com.blog.app.payload.PostResponse;
import com.blog.app.repos.CategoryRepo;
import com.blog.app.repos.PostRepo;
import com.blog.app.repos.UserRepo;
import com.fasterxml.jackson.databind.ser.std.StdKeySerializers.Default;

import net.bytebuddy.asm.Advice.This;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	PostRepo postRepo;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	CategoryRepo categoryRepo;
	
	UserServiceImpl userServiceImpl;
	CategoryServiceImpl categoryServiceImpl;

	@Override
	public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId) {
		User user= this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User"," id ",userId));
		Category category=this.categoryRepo.findById(categoryId).orElseThrow(()-> new ResourceNotFoundException("Category","CategoryId",categoryId));
		Post post=this.postDtoToPost(postDto);
		post.setUser(user);
		post.setCategory(category);
		post.setImageName("Default.png");
		post.setAddedDate(new java.sql.Date(0));
		Post savePost=this.postRepo.save(post);
		return this.PostTopostdto(savePost);
	}

	@Override
	public PostDto updatePost(PostDto postDto, Integer postId) {
		
		Post post=this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post","Id",postId));
		post.setContent(postDto.getContent());
		post.setTitle(postDto.getTitle());
		post.setImageName(postDto.getImageName());
		
		Post savedpost=this.postRepo.save(post);
		
		return this.PostTopostdto(savedpost);
	}

	@Override
	public Void deletePost(Integer postId) {
		Post posts=this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post","Id",postId));
		this.postRepo.delete(posts);
		return null;
	}

	@Override
	public PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy) {
	
		Pageable p=PageRequest.of(pageNumber,pageSize, Sort.by(sortBy));//pagination
		Page<Post> pagePost=this.postRepo.findAll(p);
		List<Post> posts=pagePost.getContent();
		List<PostDto> postDtos=posts.stream().map((i) -> this.PostTopostdto(i)).collect(Collectors.toList());
		
		PostResponse postResponse=new PostResponse();
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastpage(pagePost.isLast());
		
		
		return postResponse;
	}

	@Override
	public PostDto getPostByPostId(Integer postId) {
		Post posts=this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post","Id",postId));
		PostDto postDtos=this.PostTopostdto(posts);
		
		return postDtos;
	}

	@Override
	public List<PostDto> getAllPostByCategory(Integer categoryId) {
		Category category= this.categoryRepo.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category","Id",categoryId));
		List<Post> posts=this.postRepo.findByCategory(category);
		List<PostDto> postDtos=posts.stream().map((p)-> this.PostTopostdto(p)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> getAllPostByUser(Integer userId) {
		User user=this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User","Id",userId));
		List<Post> posts=this.postRepo.findByUser(user);
		List<PostDto> postDtos=posts.stream().map((p)-> this.PostTopostdto(p)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> searchPosts(String keyword) {
		List<Post> posts=this.postRepo.searchByTitle("%"+keyword+"%");
		List<PostDto> postDtos=posts.stream().map((post) -> this.PostTopostdto(post)).collect(Collectors.toList());
		return postDtos;
	}
	
    private Post postDtoToPost(PostDto postDto) {
		
		Post post=this.modelMapper.map(postDto, Post.class);
		
		return post;
		
	}
	
   private PostDto PostTopostdto(Post post) {
		
	   PostDto postDto=this.modelMapper.map(post, PostDto.class);
		
		return postDto;
		
   }
		

}
