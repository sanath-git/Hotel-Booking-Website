var adultsELement = document.getElementById("adults");
adultsELement.addEventListener("input", calculateAdults);
var fromDateElement = document.getElementById("fromDate");
fromDateElement.addEventListener("input", getFromDate);
var toDateElement = document.getElementById("toDate");
toDateElement.addEventListener("input", toDateFunction);

var totalField = document.getElementById("total");
var adults;
var toDate;
var fromDate;
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
  console.log(toDateMin);
  toDateElement.min = toDateMin;
  checkIfAnythingIsUndefined();
}

function checkIfAnythingIsUndefined() {
  if (adults != undefined && fromDate != undefined && toDate != undefined) {
    totalField.value = "";
    calculateTotal(adults, fromDate, toDate);
  }
}

function toDateFunction() {
  toDate = toDateElement.value;

  checkIfAnythingIsUndefined();
}

function calculateTotal(adults, fromDate, toDate) {
  totalField.value = "";
  var actualFromDate = new Date(fromDate);
  var actualToDate = new Date(toDate);
  var pricePerDay = 1000;

  var numberOfDays =
    (actualToDate.getTime() - actualFromDate.getTime()) / (1000 * 60 * 60 * 24);

  var total = pricePerDay * numberOfDays * adults;

  totalField.value = "Rs " + total;
}
