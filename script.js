const Wines = [
    {
      id: 1,
      name: "Merlot Reserve",
      type: "Red Wine",
      price: 89,
      description: "Rich wine with delicate berry flavors",
      image: "https://www.iby.at/wp-content/uploads/2022/11/iby_merlot-reserve.jpg"
    },
    {
      id: 2,
      name: "Chardonnay Classic",
      type: "White Wine",
      price: 75,
      description: "Fresh white wine with citrus aromas",
      image: "https://www.cebooze.com/app/uploads/2020/10/montesclassicchardonnay.jpg"
    },
    {
      id: 3,
      name: "Cabernet Sauvignon",
      type: "Red Wine",
      price: 110,
      description: "Bold wine with oak and dark fruit notes",
      image: "https://svijetlidvori.hr/wp-content/uploads/2017/09/SD-cabernet-sauvignon-1.png"
    },
    {
      id: 4,
      name: "Pinot Noir Elegance",
      type: "Red Wine",
      price: 95,
      description: "Smooth and elegant with cherry flavors",
      image: "https://winetime.md/images/product/2023/10/Crama-Mircesti-Elegance-Pinot-Noir-vin-sec-rosu-0.75l.png"
    },
    {
      id: 5,
      name: "Sauvignon Blanc",
      type: "White Wine",
      price: 72,
      description: "Crisp wine with citrus and green apple",
      image: "https://70winery.com/wp-content/uploads/2025/04/4-1.png"
    },
    {
      id: 6,
      name: "Rosé Sunset",
      type: "Rosé Wine",
      price: 68,
      description: "Refreshing rosé perfect for summer evenings",
      image: "https://brewscanner.ae/wp-content/uploads/2024/03/CHATEAU-KSARA-ROSE_06-highspiritsuae.com_.xlsx_PD-3250.png"
    },
    {
      id: 7,
      name: "Shiraz Premium",
      type: "Red Wine",
      price: 120,
      description: "Deep and spicy wine with blackberry aroma",
      image: "https://k1wines.com.au/cdn/shop/files/K1-MiddleHillNewLabel_1500x.png?v=1693290450"
    },
    {
      id: 8,
      name: "Malbec Estate",
      type: "Red Wine",
      price: 99,
      description: "Velvety wine with plum and chocolate notes",
      image: "https://tienda.cvne.com/900-large_default/dona-paula-estate-malbec-75cl-bottle.jpg"
    },
    {
      id: 9,
      name: "Riesling Fresh",
      type: "White Wine",
      price: 79,
      description: "Sweet and floral with balanced acidity",
      image: "https://asiavino.com/cdn/shop/files/asiavino-wine-argentina-luigi-bosca-riesling.webp?v=1754612328"
    },
    {
      id: 10,
      name: "Zinfandel Oak",
      type: "Red Wine",
      price: 115,
      description: "Strong wine with smoky oak finish",
      image: "https://northandsouthwines.co.uk/cdn/shop/products/image_33f15dff-fb6b-496f-94f6-5c3561d62cc7_1080x.png?v=1601728287"
    },
    {
      id: 11,
      name: "Champagne Royale",
      type: "Sparkling Wine",
      price: 210,
      description: "Luxury champagne with creamy texture",
      image: "https://images.unsplash.com/photo-1560512823-829485b8bf24"
    },
    {
      id: 12,
      name: "Tempranillo Reserve",
      type: "Red Wine",
      price: 88,
      description: "Spanish wine with rich vanilla aromas",
      image: "https://images.commerce7.com/justin-wine/images/x-large/jv_2022_750ml_reserve_tempranillo_enhanced_2048-1723490971414.webp"
    },
  ];
  
  function getWines() {
    const winesFromStorage = localStorage.getItem("wines");
  
    if (winesFromStorage) {
      return JSON.parse(winesFromStorage);
    }
  
    localStorage.setItem("wines", JSON.stringify(Wines));
    return Wines;
  }
  
  const wines = getWines();
  
  let selectedFilter = "All";

function renderWines() {
  const wineList = document.getElementById("wine-list");

  wineList.innerHTML = "";

  const filteredWines = selectedFilter === "All"
    ? wines
    : wines.filter(function (wine) {
        return wine.type === selectedFilter;
      });

  if (filteredWines.length === 0) {
    wineList.innerHTML = `
      <h2 class="empty-message">No wines left in stock</h2>
    `;
    return;
  }

  filteredWines.forEach(function (wine) {
    wineList.innerHTML += `
      <div class="wine-card">
        <img src="${wine.image}" alt="${wine.name}">
        <h2>${wine.name}</h2>
        <p>${wine.type}</p>
        <p>${wine.description}</p>
        <h3>${wine.price} ₪</h3>
      </div>
    `;
  });
}

function filterWines(type) {
    selectedFilter = type;
  
    const buttons = document.querySelectorAll(".filters button");
  
    buttons.forEach(function(button) {
      button.classList.remove("active");
    });
  
    event.target.classList.add("active");
  
    renderWines();
  }
  
  renderWines();