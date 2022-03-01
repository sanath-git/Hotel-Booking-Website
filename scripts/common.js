var header = `<header>
                
              </header>`;

var footer = `<footer>
                    <button type="button" class="btn btn-info btn-sm" id="contact-us" data-bs-toggle="modal" data-bs-target="#contact-modal">Contact Us</button>
                    <p id="copy-right">&copy; 2020 ROOM SEARCH PVT.LTD</p>
                    <article id="social-media">
                        <a href="https://www.facebook.com" target="_blank"><img src="assests/images/facebook.png" alt="facebook"></a>
                        <a href="https://www.instagram.com" target="_blank"><img src="assests/images/instagram.png" alt="instagram"></a>
                        <a href="https://twitter.com" target="_blank"><img src="assests/images/twitter.png" alt="twitter"></a>
                        
                    </article>


                </footer>`;

var loginModal = `<div class="modal fade" id="login-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> -->
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Please Login</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="login-form">
                      <div class="modal-body">
                          
                        <div id="flex-container">
                          <div id="label">
                              <label for="username">Username:</label>
                              <label for="password">Password:</label>
                          </div>
                          <div id="input-fields">
                            <input type="text" id="username" name="username" placeholder="Enter Username" autocomplete="off" required/>
                                      
                            <input type="password" id="password" name="password" placeholder="Enter Password" required>
                          </div>
                        </div>
                          
                      </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" id="login-button" onclick="login()">Login</button>
                        </div>
                    </form>
                </div>
                </div>
                </div> `;

var contactusModal = `<div class="modal fade" id="contact-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> -->
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Get in touch</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form action="index.html" method="GET" id="contact-us-form">
                                  <div class="modal-body">
                                    <span>Thank you for reaching out!!!</span><br>
                                    <span>Please enter your email and we get back to you</span>
                                    
                                        <label for="email">Email:</label>
                                        <input type="email" name="email" placeholder="Enter your email" required id="email"><br>
                                        
                                    
                                        </div>
                                        <div class="modal-footer">
                                          <button type="submit" class="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                  </div>
                            </div>
                        </div>`;

// ===================================================== make 2 header template for login and logout

// add the header and the footer
var bodyElement = document.getElementById("body");
bodyElement.innerHTML = header + bodyElement.innerHTML + footer;
bodyElement.innerHTML = bodyElement.innerHTML + loginModal + contactusModal;

// add the header according to the user login action
let loginHeader =
  '<a href="index.html"><img src="assests/images/logo.png" alt="logo" id="logo"></a><button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#login-modal" id="login" onclick="checkUser()">LOGIN</button>';
let logoutHeader = `<a href="index.html"><img src="assests/images/logo.png" alt="logo" id="logo"></a><button type="button" class="btn btn-light btn-sm" id="login" onclick="checkUser()">LOGOUT</button>`;
let headerElement = document.getElementsByTagName("header")[0];

if (localStorage.getItem("username") == "admin") {
  headerElement.innerHTML = logoutHeader;
} else {
  headerElement.innerHTML = loginHeader;
}

function checkUser() {
  if (localStorage.getItem("username") == "admin") {
    console.log("inside logout");
    localStorage.removeItem("username");
    headerElement.innerHTML = loginHeader;
  }
}

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username == "admin" && password == "admin") {
    localStorage.setItem("username", username);
    headerElement.innerHTML = logoutHeader;

    alert("Successfully loggedin");
  } else {
    alert("Username or password is wrong");
  }
}
