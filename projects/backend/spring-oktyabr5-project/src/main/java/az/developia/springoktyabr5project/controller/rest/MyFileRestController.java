package az.developia.springoktyabr5project.controller.rest;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
			
			File uploadFolder = new File("C:\\\\Users\\\\User\\\\Desktop\\\\project-files\\\\");
			if (uploadFolder.exists()) {
				System.out.println("folder movcuddur");
			} else {
				System.out.println("folder yarandi");
				uploadFolder.mkdir();
			}
			
			Files.copy(file.getInputStream(), Paths.get("C:\\Users\\User\\Desktop\\project-files\\"+randomName),
					StandardCopyOption.REPLACE_EXISTING);
		} catch (Exception e) {
			
		}
		
		
		return model;
	}
	
	@GetMapping(path = "/download/{fileName:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName){
		try {
			Resource file = new UrlResource(Paths.get("C:\\Users\\User\\Desktop\\project-files").resolve(fileName).toUri());
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getFilename()+"\"").body(file);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return null;
		
		
	}
}
