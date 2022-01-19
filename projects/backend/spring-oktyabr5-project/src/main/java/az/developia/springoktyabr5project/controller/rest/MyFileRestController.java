package az.developia.springoktyabr5project.controller.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.springoktyabr5project.model.FileResponseModel;

@RestController
@RequestMapping(path = "/files/rest")
@CrossOrigin(origins = "*")
public class MyFileRestController {
	
	@PostMapping(path = "/upload")
	public FileResponseModel uploadFile() {
		FileResponseModel model = new FileResponseModel();
		model.setImageName("t5r4e-3ewe4e-3ewe4t-5tre3e.png");
		return model;
	}
}
