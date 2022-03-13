var token =
  "Basic " +
  window.btoa(
    localStorage.getItem("username") + ":" + localStorage.getItem("password")
  );

  var editMode = false;

  var API_URL = 'http://localhost:8053';

  var imagesPath = "../images";

var mainContentElement = document.getElementById("main-content");
var saveComputerModalElement = document.getElementById("save-computer-modal");
var saveComputerModalCloseButtonElement = document.getElementById(
  "save-computer-modal-close-button"
);
var computerImageInputElement = document.getElementById("computer-image");
var computerNameElement = document.getElementById("computer-name");
var computerPriceElement = document.getElementById("computer-price");
var computerDescriptionElement = document.getElementById(
  "computer-description"
);
var computerIsNew = document.getElementById("computer-isNew");
var computerRam = document.getElementById("computer-ram");
var computerCpu = document.getElementById("computer-cpu");
var computerMemory = document.getElementById("computer-drive");
var computerMemoryType = document.getElementById("computer-drive-type");
var computerOs = document.getElementById("computer-os");
var saveButton = document.getElementById("saveBtn");
var resetButton = document.getElementById("resetBtn");
var computerCategoryElement = document.getElementById("computer-category");
var saveComputerHeaderMessage = document.getElementById(
  "save-computer-header-message"
);
var saveComputerModalForm = document.getElementById("save-computer-modal-form");
var computersTableElement = document.getElementById("computers-table");
var computersLoading = document.getElementById("computers-loading");
var computerImageModalElement = document.getElementById("computer-image-modal");
var computerModalImageShowElement = document.getElementById(
  "computer-modal-image-show"
);
var imageShowModal = document.getElementById('computer-image');
var computerImagePath = computerImageInputElement.value;
var nameErrorElement = document.getElementById("name-error");
var priceErrorElement = document.getElementById("price-error");
var descriptionErrorElement = document.getElementById("description-error");

var editMode = false;
var computerId = 0;

loadComputers();

function onNewComputer() {
  editMode = false;
  computerId = 0;
  resetForm();
  saveComputerModalElement.style.display = "block";
  saveComputerHeaderMessage.innerHTML = "Yeni";
  loadCategoires();
}
saveComputerModalCloseButtonElement.addEventListener("click", function (event) {
  saveComputerModalElement.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == computerImageModalElement) {
    computerImageModalElement.style.display = "none";
  }
});

function resetValidations() {
	nameErrorElement.innerHTML = '';
      priceErrorElement.innerHTML = '';
      descriptionErrorElement.innerHTML = '';
}

async function saveComputer(event) {
  event.preventDefault();
  let formData = new FormData();
  let photo = computerImageInputElement.files[0];
  console.log(photo);
  formData.append("file",photo);

  let response = await fetch(API_URL+'/files/upload',{
		method:"POST",
		body:formData,
		headers:{
			"Authorization":token
		}
	});

  let imageNameObj = await response.json();
	let imageName = imageNameObj.imageName;

  saveComputerObj(imageName);
  resetForm();
  saveComputerModalElement.style.display = "none";

  
}

function saveComputerObj(computerImage){
  var http = new XMLHttpRequest();


  http.onload = function () {
    if(this.status==200){
      resetValidations();
      
      loadComputers();
    } else if(this.status==400){
      var errors = this.responseText;
    var errorsArr = JSON.parse(errors);
    
      var nameErrorV = "";
      var descriptionErrorV = "";
      var priceErrorV = "";

      for (let i = 0; i < errorsArr.length; i++) {
        var error = errorsArr[i];
        var field = error.split(":::")[0];
        var message = error.split(":::")[1];
        if (field == "name") {
          nameErrorV += message + "<br>";
        }
        if (field == "description") {
          descriptionErrorV += message + "<br>";
        }
        if (field == "price") {
          priceErrorV += message + "<br>";
        }
      }

      nameErrorElement.innerHTML = nameErrorV;
      priceErrorElement.innerHTML = priceErrorV;
      descriptionErrorElement.innerHTML = descriptionErrorV;
    }
    
    
  };

  var computerObj = {};
  computerObj.category = computerCategoryElement.value;
  computerObj.name = computerNameElement.value;
  computerObj.price = computerPriceElement.value;
  computerObj.description = computerDescriptionElement.value;
  computerObj.isNew = computerIsNew.value;
  computerObj.photo = computerImageInputElement.value;
  computerObj.ram = computerRam.value;
  computerObj.cpu = computerCpu.value;
  computerObj.drive = computerMemory.value;
  computerObj.driveType = computerMemoryType.value;
  computerObj.os = computerOs.value;
  computerObj.photo = computerImage;

  if(editMode){
    http.open("POST", "http://localhost:8053/computers", true);
    http.setRequestHeader("Authorization", token);
    http.setRequestHeader("Content-Type", "application/JSON");
    computerObj.id = gridOptionsGlobal.api.getSelectedRows()[0].id;
    http.send(JSON.stringify(computerObj));
  } else{
    http.open("POST", "http://localhost:8053/computers", true);
    http.setRequestHeader("Authorization", token);
    http.setRequestHeader("Content-Type", "application/JSON");
    http.send(JSON.stringify(computerObj));
  }
}

function onComputerImageChanged(imageInputElement) {
  var imageValue = imageInputElement.value;
  imageValue = imageValue.trim();
  if (imageValue == "") {
    computerImageShowElement.style.display = "none";
  } else {
    computerImageShowElement.style.display = "block";
    computerImageShowElement.src = imageValue;
  }
}

function loadComputers() {
  var http = new XMLHttpRequest();

  http.onload = function () {
    var response = this.responseText;
    var computersArr = JSON.parse(response);
    fillComputersToTable(computersArr);
  };

  http.open("GET", "http://localhost:8053/computers", true);
  http.setRequestHeader("Authorization", token);
  http.send();
}

function onImageSelected(computerImagePath) {
  computerImageModalElement.style.display = "block";
  computerModalImageShowElement.src = computerImagePath;
}

function onDeleteComputer() {
    var selectedRows = gridOptionsGlobal.api.getSelectedRows();

    if(selectedRows==0){
        alert('Siyahidan 1 komputer secin!!!');
    } else{
        var computerId = selectedRows[0].id;

        var tesdiq = confirm("Komputeri silmeye eminsiniz?");

  if (tesdiq) {
    var http = new XMLHttpRequest();

    http.onload = function () {
      loadComputers();
    };

    http.open("DELETE", "http://localhost:8053/computers/" + computerId, true);
    http.setRequestHeader("Authorization", token);
    http.send();
  }
    }


  
}

function resetForm() {
  computerCategoryElement.value = 'Acer';
  computerNameElement.value = '';
  computerPriceElement.value = '';
  computerDescriptionElement.value = '';
  computerIsNew.value = 'true';
  computerImageInputElement.files = null;
  computerRam.value = '';
  computerCpu.value = '';
  computerMemory.value = '';
  computerMemoryType.value = 'hdd';
  computerOs.value = '';

}

function loadCategoires() {
  var http = new XMLHttpRequest();
    
  computerCategoryElement.innerHTML = "";
  var computerCategoryElementHTML = "";

  http.onload = function () {
    var response = this.responseText;
    var categories = JSON.parse(response);
    for (let i = 0; i < categories.length; i++) {
      const c = categories[i];
      computerCategoryElementHTML +=
        '<option value="' + c.name + '"> ' + c.name + "</option>";
    }
    computerCategoryElement.innerHTML = computerCategoryElementHTML;
  };

  http.open("GET", "http://localhost:8053/categories", true);
  http.setRequestHeader("Authorization", token);
  http.send();
}

function onEditComputer(){

    editMode = true;

    var selectedRows = gridOptionsGlobal.api.getSelectedRows();

    if(selectedRows==0){
        alert('Siyahidan 1 komputer secin!!!');
    } else{

      saveComputerModalElement.style.display = "block";
      saveComputerHeaderMessage.innerHTML = "Redakte";
      

        var computerId = selectedRows[0].id;

        loadCategoires();


        var http = new XMLHttpRequest();

        http.onload = function() {

          editMode = true;

            var response = this.responseText;
            var computer = JSON.parse(response);

            console.log(computer.name);

            computerCategoryElement.value = computer.category;
            computerNameElement.value = computer.name;
            computerPriceElement.value = computer.price;
            computerDescriptionElement.value = computer.description;
            computerIsNew.selectedIndex = !computer.isNew;
            computerImageInputElement.files[0] = null;
            computerMemory.value = computer.drive;
            computerMemoryType.value = computer.driveType;
            computerCpu.value = computer.cpu;
            computerOs.value = computer.os;
            computerRam.value = computer.ram;
        
        }

        http.open("GET","http://localhost:8053/computers/"+computerId,true);
        http.setRequestHeader("Authorization",token);
        http.send();

        }

        



        }
    






var gridOptionsGlobal;

function fillComputersToTable(array) {
  this.gridOptionsGlobal.api.setRowData(array);
}

function configureComputersAgGrid() {
  var sutunlar = [
    { field: "id", headerName: "ID", checkboxSelection: true },
    { field: "category", headerName: "Kateqoriya" },
    { field: "name", headerName: "Ad" },
    { field: "description", headerName: "Melumat" },
    { field: "price", headerName: "Qiymet" },
    { field: "isNew", headerName: "Yeni" },
    { field: "ram", headerName: "Emeli yaddas" },
    { field: "cpu", headerName: "Merkezi prosessor" },
    { field: "drive", headerName: "Daimi yaddas" },
    { field: "driveType", headerName: "Daimi yaddas tipi" },
    { field: "os", headerName: "OS" },
  ];

  const gridOptions = {
    columnDefs: sutunlar,
    rowData: [],
    defaultColDef: { sortable: true, filter: true },
    animateRows: true,
    floatingFilter: true,
    pagination: true,
    rowSelection: "multiple",
  };

  gridOptionsGlobal = gridOptions;

  document.addEventListener("DOMContentLoaded", () => {
    const gridDiv = document.getElementById("myComputers");
    new agGrid.Grid(gridDiv, gridOptions);
  });
}

configureComputersAgGrid();


function showImage() {
  var selectedComputers = gridOptionsGlobal.api.getSelectedRows();
  console.log(selectedComputers[0]);

  document.getElementById('computer-photo').src = 'http://localhost:8053/files/download/'+selectedComputers[0].photo;
  

}
