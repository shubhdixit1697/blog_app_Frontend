package com.blog.app.Services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	
	String ImageUpload(String path, MultipartFile file) throws IOException;
	
	InputStream getResource(String path,String filename) throws FileNotFoundException;

}
