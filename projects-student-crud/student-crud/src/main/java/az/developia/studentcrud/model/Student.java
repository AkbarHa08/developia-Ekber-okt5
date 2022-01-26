package az.developia.studentcrud.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message = "Bos qoymaq olmaz")
	@Size(min = 2, message = "Ad minimum 2 simvol ola biler!")
	@Size(max = 20, message = "Ad maksimum 20 simvol ola biler!")
	private String name;
	
	@NotEmpty(message = "Bos qoymaq olmaz")
	@Size(min = 2, message = "Soyad minimum 2 simvol ola biler!")
	@Size(max = 25, message = "Soyad maksimum 25 simvol ola biler!")
	private String surname;
	
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
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}

}
