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
            <button class="btn btn-primary">Buy Now</button>
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

document.getElementById("search-field").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    processData(10);
    loader.classList.remove("hidden");
  }
});

loadData("iphone");
