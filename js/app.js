const loadData = async (searchText, dataLimit) => {
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();
    displayData(data.data, dataLimit);
  } catch (error) {
    console.log(error);
  }
};

const loader = document.getElementById("loader");
const alertToast = document.getElementById("alert");
const seeMore = document.getElementById("seeMore");

const displayData = (phones, dataLimit) => {
  if (phones.length === 0) {
    alertToast.classList.remove("hidden");
    loader.classList.add("hidden");
  } else {
    alertToast.classList.add("hidden");
  }

  if (dataLimit && phones.length > 10) {
    seeMore.classList.remove("hidden");
    phones = phones.slice(0, 9);
  } else {
    seeMore.classList.add("hidden");
  }

  const cardSection = document.getElementById("card-section");
  cardSection.innerHTML = "";
  phones.forEach((phone) => {
    const { phone_name, brand, image, slug } = phone;
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
            <figure><img src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone_name}</h2>
            <p>Brand: ${brand}</p>
            <div class="card-actions justify-end">
            <label for="my-modal" onclick="detailsButton('${slug}')" class="btn btn-primary">Show Details</label>
            </div>
            </div>
        </div>
        `;
    loader.classList.add("hidden");
    cardSection.appendChild(div);
  });
};

const processData = (dataLimit) => {
  const searchField = document.getElementById("search-field").value;
  loadData(searchField, dataLimit);
};

seeMore.addEventListener("click", function () {
  processData();
});

const detailsButton = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayPhoneDetails = (phoneDetails) => {
  console.log(phoneDetails);
  const divModal = document.getElementById("modal");
  divModal.innerHTML = `
  
            <h3 class="font-bold text-lg">
              Brand: ${phoneDetails.brand}
            </h3>
            <img src="${phoneDetails.image}" alt="" >
            <p class="py-2">
              Storage: ${phoneDetails.mainFeatures.storage}
            </p>
            <p class="py-2">
              Display Size: ${phoneDetails.mainFeatures.displaySize}
            </p>
            <p class="py-2">
              Memory: ${phoneDetails.mainFeatures.memory}
            </p>
            <p class="py-2">
              Bluetooth: ${phoneDetails?.others?.Bluetooth}
            </p>
            <p class="py-2">
              GPS: ${phoneDetails?.others?.GPS}
            </p>
            <p class="py-2">
              USB: ${phoneDetails?.others?.USB}
            </p>
            <p class="py-2">
              Release Date: ${
                phoneDetails.releaseDate
                  ? phoneDetails.releaseDate
                  : "No release date found"
              }
            </p>
            <p class="py-2">
              Sensors: ${phoneDetails?.mainFeatures?.sensors?.map((sensor) => {
                return `<span>${sensor}</span>`;
              })}
            </p>
            <div class="modal-action">
              <label for="my-modal" class="btn">Yay!</label>
            </div>
  `;
};

document.getElementById("search-field").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    processData(10);
    loader.classList.remove("hidden");
  }
});

loadData("iphone");
