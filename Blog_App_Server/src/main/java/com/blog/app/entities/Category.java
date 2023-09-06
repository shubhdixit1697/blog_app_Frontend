package com.blog.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int categoryId;
	@Column(name="Title",length = 100,nullable = false)
	private String categoryTitleString;
	@Column(name="Description")
	private String categorydescription;
	
	//mapping to category column in post
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL) //cascadeAll- if removing parent all child will get deleted and adding new parents saves previous childs
	private List<Post> posts=new ArrayList<>();

}
