package com.blog.app.Services.Impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.blog.app.Services.FileService;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public String ImageUpload(String path, MultipartFile file) throws IOException {


		String name=file.getOriginalFilename();//filename
		
	    //random name
		String randomIdString=UUID.randomUUID().toString();
		String filename1=randomIdString.concat(name.substring(name.lastIndexOf(".")));
		//full filename
		String filepath=path+File.separator+filename1;
		
		File f=new File(path);
		if(!f.exists()) {
			f.mkdir();
		}
		
		Files.copy(file.getInputStream(),Paths.get(filepath));
		
		
		return filename1;
	}

	@Override
	public InputStream getResource(String path, String filename) throws FileNotFoundException {


		String filepath=path+File.separator+filename;
		InputStream is=new FileInputStream(filepath);
		
		return is;
	}

}
