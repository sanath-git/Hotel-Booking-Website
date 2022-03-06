// get the city from the url
const url = window.location.search;
const urlParams = new URLSearchParams(url);
const city = urlParams.get("city");
// console.log(city);
let mapDetailsLatLngs = [{ lat: 18.926977, lng: 72.82045 }]; //default value to get rid of undefined error

const data = null;

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var jsonData = JSON.parse(this.responseText);
    // console.log(jsonData.data);
    populateListView(jsonData.data);

    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "block";
    initMap();
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
  "9fdb01428emshdb0c451fba5f508p1128ecjsn6c790515de67"
);

xhr.send(data);

let populateListView = (data) => {
  let name, img, address, locationId, rating;
  let hotel = "";
  mapDetailsLatLngs = [];
  const populateArrays = (item) => {
    if (item.result_type == "lodging") {
      name = item.result_object.name;
      img = item.result_object.photo.images.large.url;
      address = item.result_object.address;
      locationId = item.result_object.location_id;
      rating = item.result_object.rating;
      mapDetailsLatLngs.push({
        lat: parseFloat(item.result_object.latitude),
        lng: parseFloat(item.result_object.longitude),
        locationId: locationId,
        name: name,
        address: address,
      });

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

// map view setting

let map;

function initMap() {
  var options = {
    center: { lat: mapDetailsLatLngs[0].lat, lng: mapDetailsLatLngs[0].lng },
    zoom: 10,
  };
  map = new google.maps.Map(document.getElementById("map-view"), options);

  // adding marker
  for (let i = 0; i < mapDetailsLatLngs.length; i++) {
    // console.log(mapDetailsLatLngs[i]);
    addMarker(mapDetailsLatLngs[i]);
  }

  function addMarker(props) {
    // console.log("inside add marker");
    let marker = new google.maps.Marker({
      position: { lat: props.lat, lng: props.lng },
      map: map,
    });

    let infoWindow = new google.maps.InfoWindow({
      content: `<p>${props.name}</p>
                <a href="detail.html?id=${props.locationId}">Book Now</a>`,
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }
}
