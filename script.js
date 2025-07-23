const restaurants = [
  {
    name: "Biryani Palace",
    image: "https://www.cubesnjuliennes.com/wp-content/uploads/2019/03/Instant-Pot-Veg-Biryani-Recipe.jpg",
    rating: 4.6,
    cuisine: "Indian",
    menu: ["Hyderabadi Biryani", "Veg Biryani", "Chicken Kebab"]
  },
  {
    name: "Pizza Planet",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9c4T8ahaLDklv9SRpAWhrYIyRZYuphaLPg&s",
    rating: 4.3,
    cuisine: "Italian",
    menu: ["Margherita", "Pepperoni", "Veggie Delight"]
  },
  {
    name: "Wok Express",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF7u5W-MEirZta6HOf7KOEan_v42zZeDU7Kg&s",
    rating: 4.7,
    cuisine: "Chinese",
    menu: ["Hakka Noodles", "Chilli Chicken", "Spring Roll"]
  }
];

function displayRestaurants(data) {
  const list = document.getElementById("restaurantList");
  list.innerHTML = "";

  data.forEach((res, index) => {
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
      <div class="restaurant-card">
        <img src="${res.image}" alt="${res.name}" loading="lazy" />
        <h5>${res.name}</h5>
        <p>⭐ ${res.rating} | ${res.cuisine}</p>
        <button class="btn btn-primary" onclick="showMenu(${index})">View Menu</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function showMenu(index) {
  const res = restaurants[index];
  const menuList = document.getElementById("menuList");
  menuList.innerHTML = "";
  res.menu.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `${item} <button class="btn btn-sm btn-success" onclick="addToCart('${item}')">Add</button>`;
    menuList.appendChild(li);
  });

  const modal = new bootstrap.Modal(document.getElementById("restaurantModal"));
  modal.show();
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item} added to cart!`);
}

document.getElementById("ratingFilter").addEventListener("change", filterRestaurants);
document.getElementById("cuisineFilter").addEventListener("change", filterRestaurants);

function filterRestaurants() {
  const rating = parseFloat(document.getElementById("ratingFilter").value);
  const cuisine = document.getElementById("cuisineFilter").value;

  const filtered = restaurants.filter(r =>
    (!rating || r.rating >= rating) &&
    (!cuisine || r.cuisine === cuisine)
  );

  displayRestaurants(filtered);
}

displayRestaurants(restaurants);
