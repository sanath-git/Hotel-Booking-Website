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
