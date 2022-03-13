var token =
  "Basic " +
  window.btoa(
    localStorage.getItem("username") + ":" + localStorage.getItem("password")
  );

var computerCategoriesElement = document.getElementById(
  "computer-categories-div"
);
var computersElement = document.getElementById("computers-div");
var computersLoading = document.getElementById("computers-loading");
var basketComputersCount = document.getElementById("basket-computer-count");
var openBasketButton = document.getElementById("open-basket-button");
var computerModalName = document.getElementById("computer-modal-name");
var computerModalDescription = document.getElementById(
  "computer-modal-description"
);
var saveComputerModalCloseButtonElement = document.getElementById(
    "save-computer-modal-close-button"
  );
var computerModalPrice = document.getElementById("computer-modal-price");
var computerModalPhone = document.getElementById("computer-modal-phone");
var computerModalNew = document.getElementById("computer-modal-isNew");
var computerModalRam = document.getElementById("computer-modal-ram");
var computerModalCpu = document.getElementById("computer-modal-cpu");
var computerModalDrive = document.getElementById("computer-modal-drive");
var computerModalDriveType = document.getElementById(
  "computer-modal-drive-type"
);
var computerModalOs = document.getElementById("computer-modal-os");
var computerModalVideoCard = document.getElementById(
  "computer-modal-video-card"
);
var computerDetailsModal = document.getElementById("computer-details-modal");
var computerDetailsModalContent = document.getElementById(
  "computer-details-modal-content"
);
var computerSearchInputElement = document.getElementById(
  "computer-search-input"
);
var computerModalImageContainer = document.getElementById(
  "computer-modal-image-container"
);
var computersLoadingNext = document.getElementById("computers-loading-next");
var computerCategoriesElementHTML = "";

var users = [];
var categoriesGlobal = [];
var computers = [];
var computersGlobal = [];
var computersSelectedGlobal = [];
var computersSelectedGlobalForSearch = [];
var currentSelectedCategoryId = 0;

var allComputersLoaded = false;
var begin = 0;
var length = 25;
var allowScroll = false;

function loadDataFromLocalStorage() {
  var usersString = localStorage.getItem("users");
  var categoriesString = localStorage.getItem("categories");
  var computersString = localStorage.getItem("computers");
  var basketComputersString = localStorage.getItem("basket-computers");

  if (usersString == null) {
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    users = JSON.parse(usersString);
  }

  if (categoriesString == null) {
    localStorage.setItem("categories", JSON.stringify(categories));
  } else {
    categories = JSON.parse(categoriesString);
    categoriesGlobal = categories.slice();
  }

  if (computersString == null) {
    localStorage.setItem("computers", JSON.stringify(computers));
  } else {
    computers = JSON.parse(computersString);
    computersGlobal = computers.slice();
  }

  if (basketComputersString == null) {
    localStorage.setItem("basket-computers", JSON.stringify(basketComputers));
  } else {
    basketComputers = JSON.parse(basketComputersString);
  }
}

var categories;

loadDataFromLocalStorage();

function loadComputerCategories() {
  var http = new XMLHttpRequest();

  http.onload = function () {
    var response = this.responseText;
    categories = JSON.parse(response);
    computerCategoriesElementHTML = "<ul class='list-group'>";
    for (let i = 0; i < categories.length; i++) {
      const c = categories[i];
      computerCategoriesElementHTML +=
        "<li class='list-group-item list-group-item-action' id='computer-category-" +
        c.id +
        "' onclick='onCategorySelected(" +
        c.id +
        ")'>" +
        c.name +
        "</li>";
    }

    computerCategoriesElementHTML += "</ul>";
    computerCategoriesElement.innerHTML = computerCategoriesElementHTML;
  };

  http.open("GET", "http://localhost:8053/categories", true);
  http.setRequestHeader("Authorization", token);
  http.send();
}

loadComputerCategories();

var computersSelected;

function onCategorySelected(categoryId) {
  var categoryName = document.getElementById(
    "computer-category-" + categoryId
  ).innerText;
  console.log(categoryName);
    currentSelectedCategoryId = categoryId;
    computersElement.innerHTML = "";
    computersElement.style.display = "none";
    for (let i = 0; i < categories.length; i++) {
      const c = categories[i];
      if (c.id == categoryId) {
        document.getElementById(`computer-category-${c.id}`).style.color =
          "blue";
        document.getElementById(`computer-category-${c.id}`).style.fontWeight =
          "bold";
      } else {
        document.getElementById(`computer-category-${c.id}`).style.color =
          "black";
        document.getElementById(`computer-category-${c.id}`).style.fontWeight =
          "normal";
      }
    }

    var http = new XMLHttpRequest();

    http.onload = function () {
      var response = this.responseText;
    computersSelected = JSON.parse(response);
        computersElementHTML = "";
        if (computersSelected.length <= length) {
          allComputersLoaded = true;
        }
        computersSelected = computersSelected.slice(begin, length);
        for (var i = 0; i < computersSelected.length; i++) {
          const c = computersSelected[i];
          computersElementHTML +=
            "<div class='computer-card-container' >" +
            "<div class='computer-card' >" +
            "<div class='computer-image' onclick='onComputerSelected(" +
            c.id +
            ")' style='background-image:url(http://localhost:8053/files/download/" +
            c.photo +
            ");'></div>" +
            "<div class='computer-data'><div class='computer-name' title='" +
            c.name +
            "'>Ad: " +
            c.name +
            "</div>" +
            "<div class='computer-description' title='" +
            c.description +
            "'>Təsvir: " +
            c.description +
            "</div>" +
            "<div class='computer-price' title='" +
            c.price +
            " AZN'>Qiymət: " +
            c.price +
            " AZN</div>" +
            "<div class='computer-new'>Yeni: " +
            (c.isNew ? "Bəli" : "Xeyr") +
            "</div>" +
            "</div></div></div>";
        }

        computersElement.innerHTML = computersElementHTML;
        computersElement.style.display = "block";
        if (computersSelected.length === 0) {
          computersElement.innerHTML =
            "<h2 class='not-found'>Bu kateqoriyada komputer yoxdur!</h2>";
        }
      
    };

    http.open(
      "GET",
      "http://localhost:8053/computers/category/" + categoryName,
      true
    );
    http.setRequestHeader("Authorization", token);
    http.send();
  
}

onCategorySelected(1); // show acer computers

function onComputerSelected(computerId) {
  computerDetailsModal.style.display = "block";
  var selectedComputer = null;
  for (let i = 0; i < computersSelected.length; i++) {
    const c = computersSelected[i];
    if (c.id == computerId) {
      selectedComputer = c;
      break;
    }
  }

  computerModalImageContainer.style.backgroundImage =
    "url('http://localhost:8053/files/download/" + selectedComputer.photo + "')";
  computerModalName.innerHTML = "Ad: " + selectedComputer.name;
  computerModalDescription.innerHTML = "Tesvir: " + selectedComputer.description;
  computerModalPrice.innerHTML = "Qiymet: " + selectedComputer.price;
  computerModalNew.innerHTML = selectedComputer.isNew ? "Yeni: Beli" : "Yeni: Xeyr";
  computerModalRam.innerHTML = "Ram: " + selectedComputer.ram;
  computerModalCpu.innerHTML = "Prosessor: " + selectedComputer.cpu;
  computerModalDrive.innerHTML = "Daimi Yaddas: " + selectedComputer.drive;
  computerModalDriveType.innerHTML =
    selectedComputer.driveType == "hdd" ? "Daimi yaddas tipi: HDD" : "Daimi yaddas tipi: SSD";
  computerModalOs.innerHTML = "Emeliyyat sistemi: " + selectedComputer.os;
}

window.addEventListener("click", function ( ) {
  if (event.target === computerDetailsModal) {
    computerDetailsModal.style.display = "none";
  }
});

function closeModal() {
    computerDetailsModal.style.display = "none";
}

var computersElementHTML = "";

function addComputersToPage(computersLocal) {
    computersSelected = computersLocal;
    computersElementHTML = '';
  for (var i = 0; i < computersLocal.length; i++) {
    const c = computersLocal[i];
    computersElementHTML +=
      "<div class='computer-card-container' >" +
      "<div class='computer-card' >" +
      "<div class='computer-image' onclick='onComputerSelected(" +
      c.id +
      ")' style='background-image:url(http://localhost:8053/files/download/" +
      c.photo +
      ");'></div>" +
      "<div class='computer-data'><div class='computer-name' title='" +
      c.name +
      "'>" +
      c.name +
      "</div>" +
      "<div class='computer-description' title='" +
      c.description +
      "'>" +
      c.description +
      "</div>" +
      "<div class='computer-price' title='" +
      c.price +
      " AZN'>" +
      c.price +
      " AZN</div>" +
      "<div class='computer-new'>" +
      (c.isNew ? "Bəli" : "Xeyr") +
      "</div>" +
      "</div></div></div>";
  }
  computersElement.innerHTML = computersElementHTML;
}

//Kateqoriyaya gore axtaris

function searchCategory(searchInput) {
  var searchText = searchInput.value.trim();
  searchText = searchText.toLowerCase();
  categories = [];
  for (let i = 0; i < categoriesGlobal.length; i++) {
    const c = categoriesGlobal[i];
    if (c.name.toLowerCase().includes(searchText)) {
      categories.push(c);
    }
  }

  loadComputerCategories();
}

window.addEventListener("scroll", function () {
  if (allComputersLoaded) {
    console.log("Butun komputerler yuklenib");
  } else {
    if (allowScroll) {
      const distanceToBottom =
        this.document.body.getBoundingClientRect().bottom;
      const clientHeight = this.document.documentElement.clientHeight;
      if (distanceToBottom < clientHeight + 150) {
        allowScroll = false;
        computersLoadingNext.style.display = "block";
        this.setTimeout(() => {
          if (computersSelectedGlobal.length <= begin + length) {
            allComputersLoaded = true;
            computersLoadingNext.style.display = "none";
          } else {
            begin += length;
            var nextComputers = computersSelectedGlobal.slice(
              begin,
              begin + length
            );
            addComputersToPage(nextComputers);
            computersLoadingNext.style.display = "none";
          }

          allowScroll = true;
        }, 1000);
      }
    }
  }
});

window.addEventListener("load", function () {
  setTimeout(() => {
    allowScroll = true;
  }, 500);
});


function resetCategoryDesigns(){
    for (let i = 0; i < categories.length; i++) {
        const c = categories[i];
          document.getElementById(`computer-category-${c.id}`).style.color =
            "black";
          document.getElementById(`computer-category-${c.id}`).style.fontWeight =
            "normal";
        
      }
}

function onSearch() {
    resetCategoryDesigns();
    var searchText = computerSearchInputElement.value;

    var http = new XMLHttpRequest();

    http.onload = function(){
        var response = JSON.parse(this.responseText);
        addComputersToPage(response);
    }

    var searchObj = {searchText:searchText};

    http.open("POST","http://localhost:8053/computers/search",true);
    http.setRequestHeader("Authorization",token);
    http.setRequestHeader("Content-Type","application/json");
    http.send(JSON.stringify(searchObj));
}