package az.developia.springoktyabr5project.config;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import az.developia.springoktyabr5project.repository.BookRepository;

@Configuration
public class QueryConfig {

	@Autowired
	private BookRepository bookRepository;
	
	
}
