// Form validation
var adultsELement = document.getElementById("adults");
adultsELement.addEventListener("input", calculateAdults);
var fromDateElement = document.getElementById("fromDate");
fromDateElement.addEventListener("input", getFromDate);
var toDateElement = document.getElementById("toDate");
toDateElement.addEventListener("input", toDateFunction);
var totalField = document.getElementById("total");
// function to calculate total when pressed back from payment.html

// making fromdate min=today
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
fromDateElement.min = yyyy + "-" + mm + "-" + dd;

var adults;
var toDate;
var fromDate;
checkIfAnythingIsUndefined();
function calculateAdults() {
  adults = adultsELement.value;

  checkIfAnythingIsUndefined();
}

function getFromDate() {
  fromDate = fromDateElement.value;
  totalField.value = "";
  toDateElement.value = "";
  var minDate = new Date(fromDate);
  var year = minDate.getFullYear();
  var month = String(minDate.getMonth() + 1).padStart(2, "0");
  var day = minDate.getDate() + 1;
  if (day < 10) {
    day = "0" + day;
  }
  var toDateMin = year + "-" + month + "-" + day;

  toDateElement.min = toDateMin;
  checkIfAnythingIsUndefined();
}

function checkIfAnythingIsUndefined() {
  if (adults != undefined && fromDate != undefined && toDate != undefined) {
    adults = adultsELement.value;
    fromDate = fromDateElement.value;
    toDate = toDateElement.value;
    calculateTotal(adults, fromDate, toDate);
  }
}

function toDateFunction() {
  toDate = toDateElement.value;

  checkIfAnythingIsUndefined();
}

function calculateTotal(adults, fromDate, toDate) {
  var actualFromDate = new Date(fromDate);
  var actualToDate = new Date(toDate);
  const pricePerDay = 1000;

  var numberOfDays =
    (actualToDate.getTime() - actualFromDate.getTime()) / (1000 * 60 * 60 * 24);

  var total = pricePerDay * numberOfDays * adults;

  totalField.value = "Rs " + total;
}

// get data from the api
const url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get("id");

function getHotelDetails() {
  const data = null;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const jsonData = JSON.parse(this.responseText);

      console.log(jsonData.data);
      parseHotelDetails(jsonData.data);
    }
  });

  xhr.open(
    "GET",
    `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${id}&checkin=2022-03-15&adults=1&lang=en_US&currency=USD&nights=2`
  );
  xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "d32e5d3f47msh75c155f49e4e268p198859jsndb831324b05b"
  );

  xhr.send(data);
}

function getHotelPhotos() {
  const data = null;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const jsonData = JSON.parse(this.responseText);

      console.log(jsonData.data);
      parseHotelImages(jsonData.data);
    }
  });

  xhr.open(
    "GET",
    `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${id}&currency=USD&limit=50&lang=en_US`
  );
  xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "d32e5d3f47msh75c155f49e4e268p198859jsndb831324b05b"
  );

  xhr.send(data);
}
getHotelPhotos();
getHotelDetails();

function parseHotelImages(data) {
  let carousel = "";
  let isActive = "active";
  data.forEach(getImages);

  function getImages(item) {
    const image = item.images.large.url;

    carousel =
      carousel +
      `<div class="carousel-item ${isActive}">
            <img class="d-block w-100" src="${image}" alt="">
          </div>`;
    isActive = "";
  }
  const carouselDiv = document.getElementsByClassName("carousel-inner")[0];
  carouselDiv.innerHTML = carousel;
}

function parseHotelDetails(data) {
  const name = data[0].name;
  const description = data[0].description;
  const rating = data[0].rating;
  const amenities = data[0].amenities;

  printRating(rating);
  const hotelName = document.getElementById("hotel-name");
  hotelName.innerText = name;
  const amenitiesList = document.getElementById("amenities-list");
  let liData = "";
  if (amenities.length > 10) {
    for (let i = 0; i < 10; i++) {
      liData = liData + `<li>${amenities[i].name}</li>`;
    }
  } else {
    for (let i = 0; i < amenities.length; i++) {
      liData = liData + `<li>${amenities[i].name}</li>`;
    }
  }

  amenitiesList.innerHTML = liData;

  const descriptionElement = document.getElementById("description");
  descriptionElement.innerText = description;
}

function printRating(rating) {
  let intRating = parseInt(rating);
  let ratingString = "";
  let i = 0;
  let isPositiverating = true;
  const ratingDiv = document.getElementById("rating");
  for (i = 0; i < intRating; i++) {
    ratingString = ratingString + `<i class="fa-solid fa-star rating"></i>`;
  }
  if (rating.length > 1 && rating[2] != "0") {
    isPositiverating = false;
    ratingString =
      ratingString + `<i class="fa-solid fa-star-half-stroke rating"></i>`;

    i = i + 1;
  }
  for (let j = i; j < 5; j++) {
    ratingString = ratingString + `<i class="fa-solid fa-star"></i>`;
  }

  ratingDiv.innerHTML = ratingString;
}

function setIdOfTheHotel() {
  const refToID = document.getElementById("id");
  refToID.value = id;
}
setIdOfTheHotel();
