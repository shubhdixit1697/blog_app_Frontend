package com.blog.app.Controller;

import org.springframework.http.MediaType;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystem;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.aspectj.weaver.tools.Trace;
import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog.app.Services.FileService;
import com.blog.app.Services.PostService;
import com.blog.app.config.AppConstants;
import com.blog.app.payload.PostDto;
import com.blog.app.payload.PostResponse;
import com.blog.app.payload.ResponseApi;

@RestController
@RequestMapping("/api/")
public class PostController {

	@Autowired
	private PostService postService;
	
	@Autowired
	private FileService fileService;
	
	@Value("${project.image}")
	private String path;
	
	@PostMapping("/user/{userId}/category/{categoryId}/posts")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto,
			@PathVariable Integer userId,
			@PathVariable Integer categoryId){
		
		PostDto createPost=this.postService.createPost(postDto, userId, categoryId);
		return new ResponseEntity<>(createPost,HttpStatus.CREATED);
		
	}
	
	@GetMapping("/user/{userId}/posts")
	public ResponseEntity<List<PostDto>> getAllUser(@PathVariable Integer userId){
		
		List<PostDto> postDtos=this.postService.getAllPostByUser(userId);
		return new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
		
	}
	
	@GetMapping("/category/{categoryId}/posts")
	public ResponseEntity<List<PostDto>> getAllCategory(@PathVariable Integer categoryId){
		
		List<PostDto> postDtos=this.postService.getAllPostByCategory(categoryId);
		return new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
		
	}
	
	@GetMapping("/posts")
	public ResponseEntity<PostResponse> getAllPosts(
			@RequestParam(value="pagenumber",defaultValue=AppConstants.PAGE_NUMBER,required=false) Integer pageNumber 
			,@RequestParam(value="pageSize",defaultValue =AppConstants.PAGE_SIZE,required=false) Integer pageSize
			,@RequestParam(value="sortBy",defaultValue =AppConstants.SORT_BY,required=false) String sortBy){
		
		PostResponse postDtos=this.postService.getAllPost(pageNumber, pageSize,sortBy);
		return new ResponseEntity<PostResponse>(postDtos,HttpStatus.OK);
		
	}
	
	@GetMapping("/posts/{postId}")
	public ResponseEntity<PostDto> getPostbyId(@PathVariable Integer postId){
		
		PostDto postDto=this.postService.getPostByPostId(postId);
		return new ResponseEntity<PostDto>(postDto,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/posts/{postId}")
	public ResponseApi deletePost(@PathVariable Integer postId){
		
		this.postService.deletePost(postId);
		return new ResponseApi("Post is successfully deleted",true);
		
	}
	
	@PutMapping("/posts/{postId}")
	public ResponseEntity<PostDto> deletePost(@RequestBody PostDto postDto, @PathVariable Integer postId){
		
		PostDto updatedPost=this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDto>(updatedPost,HttpStatus.OK);
		
	}
	
	@GetMapping("/posts/search/{keyword}")
	public ResponseEntity<List<PostDto>> searchPostByTitle(@PathVariable String keyword){
		
		List<PostDto> postDtos=this.postService.searchPosts(keyword);
		return new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
		
	}
	
	@PostMapping("/posts/image/upload/{postId}")
	public ResponseEntity<PostDto> uploadPostImage(@RequestParam("image") MultipartFile file,
			@PathVariable Integer postId) throws IOException{
		
		String filename=this.fileService.ImageUpload(path, file);
		PostDto postDto=this.postService.getPostByPostId(postId);
		postDto.setImageName(filename);
		PostDto updateddetails=this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDto>(updateddetails,HttpStatus.OK);
		
	}
	
	@GetMapping(value="posts/image/{imageName}" ,produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(
			@PathVariable("imageName") String imageName,HttpServletResponse response) throws IOException{
		
		InputStream resource=this.fileService.getResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource,response.getOutputStream());
	}
	
}
