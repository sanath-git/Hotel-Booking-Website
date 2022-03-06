// toggle between view more and view less
document.getElementById("loader").style.display = "none";
document.getElementById("main").style.display = "block";
var checkViewMoreViewLess = true;
var secondDiv = document.getElementsByClassName("city-cards")[1];
secondDiv.style.display = "none";
function viewMore() {
  if (checkViewMoreViewLess) {
    secondDiv.style.display = "grid";

    var viewMoreButton = document.getElementById("view-more");
    viewMoreButton.innerText = "View Less";
    checkViewMoreViewLess = false;
  } else {
    secondDiv.style.display = "none";
    var viewMoreButton = document.getElementById("view-more");
    viewMoreButton.innerText = "View More";
    checkViewMoreViewLess = true;
  }
}
// get search details
const searchBarElement = document.getElementById("search");
searchBarElement.addEventListener("input", searchCity);

function searchCity() {
  // console.log("typing");
  let searchText = searchBarElement.value;
  if (searchText.length >= 3) {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let jsonData = JSON.parse(this.responseText);
        console.log("search details");
        console.log(jsonData.data.Typeahead_autocomplete.results);
        parseSearchResults(jsonData.data.Typeahead_autocomplete.results);
      }
    });

    xhr.open(
      "GET",
      `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${searchText}&lang=en_US&units=km`
    );
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "9fdb01428emshdb0c451fba5f508p1128ecjsn6c790515de67"
    );

    xhr.send(data);
  } else {
    document.getElementById("search-result").innerHTML = "";
  }

  function parseSearchResults(data) {
    let displayResult = "";
    data.forEach(getText);

    let searchData = [];
    function getText(item) {
      if (item.detailsV2 != undefined && item.detailsV2.placeType == "CITY") {
        // searchData.push(item.text);
        displayResult =
          displayResult +
          `<a href="list.html?city=${item.detailsV2.names.name}">${item.detailsV2.names.name}</a>`;
      }
    }

    const searchBarContent = document.getElementById("search-result");
    searchBarContent.innerHTML = displayResult;
  }
}
