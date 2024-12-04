var logoutBtn             = document.getElementById("logout");
var toSignup              = document.querySelector("#toSignup");
var toLogin               = document.querySelector("#toLogin");

var welcomeLayer          = document.getElementById("welcomeLayer");
var loginLayer            = document.getElementById("loginLayer");
var signupLayer           = document.getElementById("signupLayer");

var signupUsernameInput   = document.getElementById("signupUsername");
var signupGmailInput      = document.getElementById("signupGmail");
var signupPasswordInput   = document.getElementById("signupPassword");
var loginGmailInput       = document.getElementById("loginGmailInput");
var loginPasswordInput    = document.getElementById("loginPasswordInput");

var loginForm             = document.querySelector("#loginForm");
var signupForm            = document.querySelector("#signupForm");

var loginBtn              = document.querySelector(".login-button");
var signupBtn             = document.querySelector(".signup-button");

var warning               = document.querySelector(".warning");
var invalidMsg            = document.querySelector(".invalid");
var gmailExistMsg         = document.querySelector(".gmail-exist");

var usernameSpan          = document.getElementById("usernameSpan");

var matched1;
var matched2;
var matched3;

var usersList = [];
if (localStorage.getItem("users") != null) {
  usersList = JSON.parse(localStorage.getItem("users"));
}

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  validation();
  var notExist = CheckEmailExist();
  if (matched1 && matched2 && matched3) {
    if (notExist == false) {
      warning.classList.add("d-none");
      gmailExistMsg.classList.remove("d-none");
    } else {
      warning.classList.add("d-none");
      user = {
        username: signupUsernameInput.value,
        gmail: signupGmailInput.value,
        password: signupPasswordInput.value,
      };

      usersList.push(user);
      localStorage.setItem("users", JSON.stringify(usersList));
      clearForm();
      invalidMsg.classList.add("d-none");
      signupLayer.classList.replace("d-flex", "d-none");
      loginLayer.classList.replace("d-none", "d-flex");
      invalidMsg.classList.add("d-none");
      gmailExistMsg.classList.add("d-none");
    }
  } else {
    warning.classList.remove("d-none");
  }
});

// ======================== to CHECK GMAIL EXIST ====================== //
function CheckEmailExist() {
  for (var i = 0; i < usersList.length; i++) {
    if (
      usersList[i].gmail.toLowerCase() == signupGmailInput.value.toLowerCase()
    ) {
      return false;
    }
  }
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var loginGmail = loginGmailInput.value;
  var loginPassword = loginPasswordInput.value;
  for (i = 0; i < usersList.length; i++) {
    if (
      loginGmail == usersList[i].gmail &&
      loginPassword == usersList[i].password
    ) {
      usernameSpan.innerHTML = usersList[i].username;
      welcomeLayer.classList.remove("d-none");
      loginLayer.classList.replace("d-flex", "d-none");
    } else {
      invalidMsg.classList.remove("d-none");
    }
  }
});
function validation() {
  var regex = {
    a: /^[a-zA-Z]{3}/,
    s: /.com$/,
    d: /\w{5}/,
  };
  matched1 = regex.a.test(signupUsernameInput.value);
  matched2 = regex.s.test(signupGmailInput.value);
  matched3 = regex.d.test(signupPasswordInput.value);
}

function clearForm() {
  signupUsernameInput.value = "";
  signupGmailInput.value = "";
  signupPasswordInput.value = "";
  loginGmailInput.value = "";
  loginPasswordInput.value = "";
  gmailExistMsg.classList.add("d-none");
  invalidMsg.classList.add("d-none");
  warning.classList.add("d-none");
}

toSignup.addEventListener("click", function () {
  signupLayer.classList.replace("d-none", "d-flex");
  loginLayer.classList.replace("d-flex", "d-none");
  clearForm();
});

toLogin.addEventListener("click", function () {
  clearForm();
  loginLayer.classList.replace("d-none", "d-flex");
  signupLayer.classList.replace("d-flex", "d-none");
});

logoutBtn.addEventListener("mousedown", function () {
  logoutBtn.classList.replace("logout-up", "logout-down");
});

logoutBtn.addEventListener("mouseup", function () {
  logoutBtn.classList.replace("logout-down", "logout-up");
  invalidMsg.classList.add("d-none");
  clearForm();
  welcomeLayer.classList.add("d-none");
  loginLayer.classList.replace("d-none", "d-flex");
});
