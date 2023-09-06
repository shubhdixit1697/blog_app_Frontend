package com.blog.app.Services.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.app.Services.CategoryService;
import com.blog.app.entities.Category;
import com.blog.app.exceptions.ResourceNotFoundException;
import com.blog.app.payload.CategoryDto;
import com.blog.app.repos.CategoryRepo;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryRepo categoryRepo;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		Category category=this.categorydtoToCategory(categoryDto);
		Category saveDto=this.categoryRepo.save(category);
		
		return this.categorytocategorydto(saveDto);
	}

	@Override
	public CategoryDto updtaeCategory(CategoryDto categoryDto ,Integer categoryId) {
		Category category=this.categoryRepo.findById(categoryId).orElseThrow(()-> new ResourceNotFoundException("Category","CategoryId",categoryId));
		category.setCategorydescription(categoryDto.getCategorydescription());
		category.setCategoryId(categoryDto.getCategoryId());
		category.setCategoryTitleString(categoryDto.getCategoryTitleString());
		
		Category saved=this.categoryRepo.save(category);
		return this.categorytocategorydto(saved);
	}

	@Override
	public void deleteCategory(Integer categoryId) {
		Category category=this.categoryRepo.findById(categoryId).orElseThrow(()-> new ResourceNotFoundException("Category","CategoryId",categoryId));

		this.categoryRepo.delete(category);

	}

	@Override
	public List<CategoryDto> getAllCategory() {
		List<Category> categories=this.categoryRepo.findAll();
		List<CategoryDto> collectCategoryDtos= categories.stream().map((cat)->this.modelMapper.map(cat,CategoryDto.class)).collect(Collectors.toList());
		return collectCategoryDtos;
	}

	@Override
	public CategoryDto getCategoryDto(Integer categoryId) {
		Category category=this.categoryRepo.findById(categoryId).orElseThrow(()-> new ResourceNotFoundException("Category","CategoryId",categoryId));

		return this.categorytocategorydto(category);
	}
	
	 Category categorydtoToCategory(CategoryDto categoryDto) {
		
		Category category=this.modelMapper.map(categoryDto, Category.class);
		
		return category;
		
	}
	
    CategoryDto categorytocategorydto(Category category) {
		
		CategoryDto categoryDto2=this.modelMapper.map(category, CategoryDto.class);
		
		return categoryDto2;
		
	}


}
