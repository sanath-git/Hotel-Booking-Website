// code for making sure that the user is logged in for payment
if (localStorage.getItem("username") != undefined) {
  let payNowButton = document.getElementById("paynow-button");
  payNowButton.disabled = false;
}

var loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", loginUser);

function loginUser() {
  if (localStorage.getItem("username") != undefined) {
    let payNowButton = document.getElementById("paynow-button");
    payNowButton.disabled = false;
  }
}

var headerLogin = document.getElementById("login");
headerLogin.addEventListener("click", checkIfLoggerIn);

function checkIfLoggerIn() {
  if (localStorage.getItem("username") != undefined) {
    let payNowButton = document.getElementById("paynow-button");
    payNowButton.disabled = false;
  } else {
    let payNowButton = document.getElementById("paynow-button");
    payNowButton.disabled = true;
  }
}

const makePayment = () => {
  alert("Hi your booking is successfull !!");
};

// display the hotel and payment details by fetching data from the api

const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get("id");

const data = null;
const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    const jsonData = JSON.parse(this.responseText);
    console.log(jsonData.data);
    getAndSetHotelDetails(jsonData.data[0]);
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "block";
  }
});

xhr.open(
  "GET",
  `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelId}&checkin=2022-03-15&adults=1&lang=en_US&currency=USD&nights=2`
);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader(
  "x-rapidapi-key",
  "9fdb01428emshdb0c451fba5f508p1128ecjsn6c790515de67"
);

xhr.send(data);

function getAndSetHotelDetails(data) {
  const name = data.name;
  const address = data.address;
  const ranking = data.ranking;
  const imageUrl = data.photo.images.large.url;

  // get html references
  const refToImage = document.getElementById("hotel-image");
  const refToAddress = document.getElementById("address");
  const refToRanking = document.getElementById("ranking");
  const refToName = document.getElementById("hotel-name");

  refToImage.setAttribute("src", imageUrl);
  refToName.innerText = name;
  refToAddress.innerText = address;
  refToRanking.innerHTML = ranking;
}

// set customer and payment details
function setCustomerAndPaymentDetails() {
  const name = urlParams.get("name");
  const adults = urlParams.get("adults");
  const stringFromDate = urlParams.get("fromDate");
  const stringToDate = urlParams.get("toDate");
  // const stringTotal = urlParams.get("total");

  const fromDateArr = stringFromDate.split("-");
  const toDateArr = stringToDate.split("-");

  const fromDate = new Date(stringFromDate);
  const toDate = new Date(stringToDate);

  const noOfDays =
    (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);

  const total = 1000 * noOfDays * parseInt(adults);

  // get ref to the html elements

  const refToName = document.getElementById("name");
  const refToAdults = document.getElementById("adults");
  const refToFromDate = document.getElementById("fromDate");
  const refToToDate = document.getElementById("toDate");
  const refToTarrifBreakdown = document.getElementById("tariff-breakdown");
  const refToTotalAmount = document.getElementById("total-amount");

  // set the values for html references
  refToName.innerText = name;
  refToAdults.innerText = adults;
  refToFromDate.innerText = `${fromDateArr[2]}/${fromDateArr[1]}/${fromDateArr[0]}`;
  refToToDate.innerText = `${toDateArr[2]}/${toDateArr[1]}/${toDateArr[0]}`;
  refToTarrifBreakdown.innerText = `Rs.1000 x ${adults} Adults x ${noOfDays} Nights`;
  refToTotalAmount.innerText = `Rs.${total}`;
}

setCustomerAndPaymentDetails();
