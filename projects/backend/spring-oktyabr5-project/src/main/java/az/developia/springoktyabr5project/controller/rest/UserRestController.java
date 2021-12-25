package az.developia.springoktyabr5project.controller.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/users/rest")
@CrossOrigin(origins = "*")
public class UserRestController {

	@GetMapping(path="/login")
	public String login(){
		
		
		return "success";
	}
	
	
}
