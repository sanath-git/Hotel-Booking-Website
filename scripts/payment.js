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
