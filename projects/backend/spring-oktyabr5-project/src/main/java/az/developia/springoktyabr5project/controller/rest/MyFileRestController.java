package az.developia.springoktyabr5project.controller.rest;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import az.developia.springoktyabr5project.model.FileResponseModel;

@RestController
@RequestMapping(path = "/files/rest")
@CrossOrigin(origins = "*")
public class MyFileRestController {
	
	@PostMapping(path = "/upload")
	public FileResponseModel uploadFile(@RequestParam(name="file") MultipartFile file) {
		FileResponseModel model = new FileResponseModel();
		try {
			String fileName = file.getOriginalFilename();
			String fileFormat = fileName.substring(fileName.lastIndexOf("."));
			String randomName = UUID.randomUUID().toString()+fileFormat;
			model.setImageName(randomName);
			Files.copy(file.getInputStream(), Paths.get("C:\\Users\\User\\Desktop\\project-files\\"+randomName),
					StandardCopyOption.REPLACE_EXISTING);
		} catch (Exception e) {
			
		}
		
		
		return model;
	}
}
