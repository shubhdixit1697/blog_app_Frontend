package com.blog.app.Services;

import java.util.List;

import com.blog.app.payload.CategoryDto;

public interface CategoryService {
	
	CategoryDto createCategory(CategoryDto categoryDto);
	
	CategoryDto updtaeCategory(CategoryDto categoryDto, Integer categoryId);
	
	public void deleteCategory(Integer categoryId);
	
	List<CategoryDto> getAllCategory();
	
	CategoryDto getCategoryDto(Integer categoryId);

}
