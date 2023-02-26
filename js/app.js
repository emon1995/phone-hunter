const loadData = async () => {
  const URL = `https://openapi.programming-hero.com/api/phones?search=iphone`;

  try {
    const res = await fetch(URL);
    const data = await res.json();
    displayData(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayData = (phones) => {
  const cardSection = document.getElementById("card-section");
  phones.forEach((phone) => {
    console.log(phone);
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
    cardSection.appendChild(div);
  });
};

loadData();
