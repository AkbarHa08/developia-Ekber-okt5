var token =
  "Basic " +
  window.btoa(
    localStorage.getItem("username") + ":" + localStorage.getItem("password")
  );

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
var computerImagePath = computerImageInputElement.value;
var nameErrorElement = document.getElementById("name-error");
var priceErrorElement = document.getElementById("price-error");
var descriptionErrorElement = document.getElementById("description-error");

var editMode = false;
var selectedComputerId = 0;

loadComputers();

function onNewComputer() {
  editMode = false;
  selectedComputerId = 0;
  saveComputerModalElement.style.display = "block";
  saveComputerHeaderMessage.innerHTML = "Yeni";
  var http = new XMLHttpRequest();

  computerCategoryElement.innerHTML = "";
  var computerCategoryElementHTML = "";

  http.onload = function () {
    var response = this.responseText;
    var categories = JSON.parse(response);
    for (let i = 0; i < categories.length; i++) {
      const c = categories[i];
      computerCategoryElementHTML +=
        '<option value="' + c.id + '"> ' + c.name + "</option>";
    }
    computerCategoryElement.innerHTML = computerCategoryElementHTML;
  };

  http.open("GET", "http://localhost:8053/categories", true);
  http.setRequestHeader("Authorization", token);
  http.send();
}
saveComputerModalCloseButtonElement.addEventListener("click", function (event) {
  saveComputerModalElement.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == computerImageModalElement) {
    computerImageModalElement.style.display = "none";
  }
});

function saveComputer() {
  var http = new XMLHttpRequest();

  http.onload = function () {
    var errors = this.responseText;
    var errorsArr = JSON.parse(errors);
    if (errorsArr.length == 0) {
      loadComputers();
    } else {
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

  http.open("POST", "http://localhost:8053/computers", true);
  http.setRequestHeader("Authorization", token);
  http.setRequestHeader("Content-Type", "application/JSON");
  http.send(JSON.stringify(computerObj));
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

function resetComputerForm() {
  computerImageShowElement.style.display = "none";
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
    var computerId = gridOptionsGlobal.api.getSelectedRows()[0].id;


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




var gridOptionsGlobal;

function fillComputersToTable(array) {
  this.gridOptionsGlobal.api.setRowData(array);
}

function configureComputersAgGrid() {
  var sutunlar = [
    { field: "id", headerName: "ID", checkboxSelection: true },
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
