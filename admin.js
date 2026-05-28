const wineForm = document.getElementById("wine-form");
const adminWineList = document.getElementById("admin-wine-list");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const editCancelationBtn = document.getElementById("cancel-edit-btn");

let editingWineId = null;

function getWines() {
  return JSON.parse(localStorage.getItem("wines"));
}

function saveWines(wines) {
  localStorage.setItem("wines", JSON.stringify(wines));
}

function renderAdminWines() {
  const wines = getWines();

  if (wines.length === 0) {
    adminWineList.innerHTML = `
      <h2 class="empty-message">No wines left in stock</h2>
    `;
    return;
  }

  wines.forEach(function (wine) {
    adminWineList.innerHTML += `
      <div class="wine-card">
        <img src="${wine.image}" alt="${wine.name}">
        <h2>${wine.name}</h2>
        <p>${wine.type}</p>
        <p>${wine.description}</p>
        <h3>${wine.price} ₪</h3>

        <button onclick="editWine(${wine.id})">Edit</button>
        <button onclick="deleteWine(${wine.id})">Delete</button>
      </div>
    `;
  });
}

wineForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const wines = getWines();

  const wineData = {
    id: editingWineId || Date.now(),
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    price: Number(document.getElementById("price").value),
    description: document.getElementById("description").value,
    image: document.getElementById("image").value
  };

  if (editingWineId) {
    const updatedWines = wines.map(function (wine) {
      if (wine.id === editingWineId) {
        return wineData;
      }

      return wine;
    });

    saveWines(updatedWines);
  } else {
    wines.push(wineData);
    saveWines(wines);
  }

  resetForm();
  renderAdminWines();
});

function deleteWine(id) {
    
    const wines = getWines();
  
    const updatedWines = wines.filter(function (wine) {
      return wine.id !== id;
    });
  
    saveWines(updatedWines);
    renderAdminWines();
  }

function editWine(id) {
  const wines = getWines();

  const wineToEdit = wines.find(function (wine) {
    return wine.id === id;
  });

  if (!wineToEdit) {
    return;
  }

  editingWineId = id;

  document.getElementById("name").value = wineToEdit.name;
  document.getElementById("type").value = wineToEdit.type;
  document.getElementById("price").value = wineToEdit.price;
  document.getElementById("description").value = wineToEdit.description;
  document.getElementById("image").value = wineToEdit.image;

  formTitle.textContent = "Edit wine";
  submitBtn.textContent = "Save Changes";
  editCancelationBtn.style.display = "inline-block";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function resetForm() {
  editingWineId = null;

  wineForm.reset();

  formTitle.textContent = "Add new wine";
  submitBtn.textContent = "Add Wine";
  editCancelationBtn.style.display = "none";
}

editCancelationBtn.addEventListener("click", function () {
  resetForm();
});

renderAdminWines();