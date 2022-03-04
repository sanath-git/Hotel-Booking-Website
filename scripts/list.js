// get the city from the url
const url = window.location.search;
const urlParams = new URLSearchParams(url);
const city = urlParams.get("city");
console.log(city);

const data = null;

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var jsonData = JSON.parse(this.responseText);

    populateListView(jsonData.data);
  }
};

xhr.open(
  "GET",
  `https://travel-advisor.p.rapidapi.com/locations/search?query=${city}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`,
  true
);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader(
  "x-rapidapi-key",
  "d32e5d3f47msh75c155f49e4e268p198859jsndb831324b05b"
);

xhr.send(data);

let populateListView = (data) => {
  let name, img, address, locationId, rating;
  let hotel = "";
  const populateArrays = (item) => {
    if (item.result_type == "lodging") {
      name = item.result_object.name;
      img = item.result_object.photo.images.large.url;
      address = item.result_object.address;
      locationId = item.result_object.location_id;
      rating = item.result_object.rating;

      hotel =
        hotel +
        `<a href="detail.html?id=${locationId}">
        <article class="hotels">
            
            
                <img src="${item.result_object.photo.images.large.url}" alt="${name}">
                <article class="hotel-desc">
                    <h3>${name}</h3>
                    <p>${rating}<i class="fa-solid fa-star rating"></i></p>

                    <p>${address}</p>
                </article>
            
           
        </article>
        </a>`;
    }
  };

  data.forEach(populateArrays);

  let listView = document.getElementById("list-view");
  listView.innerHTML = hotel;
};
