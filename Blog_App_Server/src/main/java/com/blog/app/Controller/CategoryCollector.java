package com.blog.app.Controller;

import java.util.List;

import javax.validation.Valid;

import org.aspectj.weaver.NewConstructorTypeMunger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.app.Services.CategoryService;
import com.blog.app.entities.Category;
import com.blog.app.payload.CategoryDto;
import com.blog.app.payload.ResponseApi;

@RestController
@RequestMapping("/api/categories")
public class CategoryCollector {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto){
		
		CategoryDto createCat=this.categoryService.createCategory(categoryDto);
		
		return new ResponseEntity<>(createCat,HttpStatus.CREATED);
		
	}
	@PutMapping("/{catId}")
	public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto, @PathVariable Integer catId ){
		
		CategoryDto updateCategory=this.categoryService.updtaeCategory(categoryDto, catId);
		
		return ResponseEntity.ok(updateCategory);
	}
	
	@DeleteMapping("/{catId}")
	public ResponseEntity<ResponseApi> deleteCategory(@PathVariable Integer catId ){
		
		this.categoryService.deleteCategory(catId);
		
		return new ResponseEntity<ResponseApi>(new ResponseApi("Category Deleted Successfully", true),HttpStatus.OK);
	}
	
	@GetMapping("/{catId}")
	public ResponseEntity<CategoryDto> getCategory(@PathVariable Integer catId ){
		
		CategoryDto getCategory=this.categoryService.getCategoryDto(catId);
		
		return new ResponseEntity<CategoryDto>(getCategory,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<CategoryDto>> getallCategory(){
		
		List<CategoryDto> getallCategory=this.categoryService.getAllCategory();
		
		return ResponseEntity.ok(getallCategory);
	}

}
