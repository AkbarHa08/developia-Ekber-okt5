package az.developia.computershoppingekberhebibullayev.controller;

import java.io.File;
import java.nio.file.Files;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import az.developia.computershoppingekberhebibullayev.model.FileResponseModel;

@RestController
@RequestMapping(path = "/files")
@CrossOrigin(origins = "*")
public class MyFileRestController { 

	@PostMapping(path = "/upload")
	public FileResponseModel uploadFile(@RequestParam(name = "file") MultipartFile file) {
		FileResponseModel model = new FileResponseModel();
		try {
			String fileName = file.getOriginalFilename();
			String fileFormat = fileName.substring(fileName.lastIndexOf("."));
			String randomName = UUID.randomUUID().toString()+fileFormat;
			model.setImageName(randomName);
			
			File uploadFolder = new File("C:\\Users\\User\\Documents\\GitHub\\developia-Ekber-okt5\\last-project\\images\\");
			if (uploadFolder.exists()) {
				System.out.println("Folder movcuddur!");
			} else {
				System.out.println("Folder yarandi");
				uploadFolder.mkdir();
			}
			Files.copy(file.getInputStream(), Paths.get("C:\\Users\\User\\Documents\\GitHub\\developia-Ekber-okt5\\last-project\\images\\"+randomName),
					StandardCopyOption.REPLACE_EXISTING);
			
		} catch (Exception e) {
			
		}
		
		return model;
		
		
		
		
	}
	
	
	@GetMapping(path = "/download/{filename:.+}")
	public ResponseEntity<Resource> download(@PathVariable String filename){
		try {
			Resource file = new UrlResource(Paths.get("C:\\Users\\User\\Documents\\GitHub\\developia-Ekber-okt5\\last-project\\images").resolve(filename).toUri());
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getFilename()+"\"").body(file);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
