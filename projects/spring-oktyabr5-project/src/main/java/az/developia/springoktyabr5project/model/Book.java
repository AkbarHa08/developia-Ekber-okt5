package az.developia.springoktyabr5project.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.*;
import java.util.List;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 100, message = "Kitab adı maksimum 100 simvol ola bilər!")
    @NotEmpty(message = "Boş qoymaq olmaz!")
    @Size(min = 2, message = "Tələbə adı minimum 2 simvol olmalıdır!")
    private String name;

    @Size(max = 300, message = "Kitab haqqında məlumat maksimum 300 simvol ola bilər!")
    @NotEmpty(message = "Boş qoymaq olmaz!")
    @Size(min = 10, message = "Kitab haqqında məlumat minimum 10 simvol ola bilər!")
    private String description;

//    @Size(max = 60, message = "Yazar adı maksimum 60 simvol ola bilər!")
//    @NotEmpty(message = "Yazar adı boş ola bilməz!")
//    @Size(min = 3, message = "Yazar adı minimum 3 simvol ola bilər!")
    private String author;

//    @Max(value = 300, message = "Kitab qiyməti maksimum 300 ola bilər!")
//    @Min(value = 3, message = "Kitab qiyməti minimum 3 ola bilər!")
    private Double price;

    private String language;
    
    @ManyToMany
    private List<Genre> genres;

    public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}

	public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
