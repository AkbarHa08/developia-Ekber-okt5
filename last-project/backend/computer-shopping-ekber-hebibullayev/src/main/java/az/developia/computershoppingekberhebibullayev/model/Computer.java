package az.developia.computershoppingekberhebibullayev.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "computers")
public class Computer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Size(min = 2, max = 30, message = "Ad minimum 2, maksimum 30 simvol ola biler!")
	@NotEmpty(message = "Bos qoymaq olmaz")
	private String name;
	
	@Size(min = 2, max = 100, message = "Tesvir minimum 2, maksimum 100 simvol ola biler!")
	private String description;
	
	private String os;
	
	@NotNull(message = "Bos qoymaq olmaz!")
	@Max(value = 10000, message = "Maksimum 10000 ola biler!")
	@Min(value = 2, message = "Minimum 2 ola biler")
	private Double price;
	private Integer drive;
	private String driveType;
	private String cpu;
	private Integer ram;
	
	@NotNull(message = "Bos qoymaq olmaz")
	private Boolean isNew;
	
	private String photo;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	private String category;

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

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getDrive() {
		return drive;
	}

	public void setDrive(Integer drive) {
		this.drive = drive;
	}

	public String getDriveType() {
		return driveType;
	}

	public void setDriveType(String driveType) {
		this.driveType = driveType;
	}

	public String getCpu() {
		return cpu;
	}

	public void setCpu(String cpu) {
		this.cpu = cpu;
	}

	public Integer getRam() {
		return ram;
	}

	public void setRam(Integer ram) {
		this.ram = ram;
	}

	public Boolean getIsNew() {
		return isNew;
	}

	public void setIsNew(Boolean isNew) {
		this.isNew = isNew;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	

	
	
	
}
