package az.developia.crmokt5akbarhabibullayev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.crmokt5akbarhabibullayev.model.Authority;
import az.developia.crmokt5akbarhabibullayev.model.User;
import az.developia.crmokt5akbarhabibullayev.repository.AuthorityRepository;
import az.developia.crmokt5akbarhabibullayev.repository.UserRepository;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "*")
public class UserRestController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthorityRepository authorityRepository;
	
	@PostMapping
	public User addUser(@RequestBody User user) {
		
		user.setPassword("{noop}"+user.getPassword());
		user.setEnabled(true);
		User savedUser = userRepository.save(user);
		
		Authority authority = new Authority();
		authority.setUsername(user.getUsername());
		authority.setAuthority("company");
		authorityRepository.save(authority);
		
		return savedUser;
	}
	
	@GetMapping(path = "/login")
	public void login() {
		
	}
}
