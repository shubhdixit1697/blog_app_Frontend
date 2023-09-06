package com.blog.app.entities;

import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.id.CompositeNestedGeneratedValueGenerator.GenerationContextLocator;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="Comments")
public class Comment {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int Id;
	private String content;
	
	@ManyToOne
	private Post post;
	
	

}
