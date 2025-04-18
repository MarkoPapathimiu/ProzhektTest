function loadNavbar() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      if (!localStorage.getItem("currentUser")) {
        localStorage.setItem("currentUser", "0");
      }

      document.getElementById("navbar").innerHTML = data;
      initializeForms(); // Ensure event listeners are added AFTER navbar loads
    })
    .catch((error) => console.error("Error loading navbar:", error));
}

function initializeForms() {
  // Get currentUser's Id from localstorage
  function getCurrentUser() {
    return localStorage.getItem("currentUser");
  }

  const signUpForm = document.getElementById("signUpForm");
  const loginForm = document.getElementById("logInForm");

  // Collect inputs for sign up
  const userNameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const userAgeInput = document.getElementById("ageInput");
  const userHeightInput = document.getElementById("heightInput");
  const userWeightInput = document.getElementById("weightInput");

  // Sign Up - API call
  function createUser(event) {
    const currentUserID = getCurrentUser();

    event.preventDefault();

    const username = userNameInput.value.trim();
    const password = passwordInput.value;
    const age = parseInt(userAgeInput.value);
    const height = parseInt(userHeightInput.value);
    const weight = parseInt(userWeightInput.value);

    if (!username || !password || !age || !height || !weight) {
      alert("Please fill in all fields.");
      return;
    }

    const userData = {
      username: username,
      password: password,
      age: age,
      height: height,
      weight: weight,
    };

    if (currentUserID === "0") {
      fetch("https://localhost:7084/api/user/CreateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("User creation failed");
          return response.json();
        })
        .then((data) => {
          alert("User created successfully! You can now log in.");
          signUpForm.reset();
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          alert("Username may already exist. Please try again.");
        });
    } else {
      alert("Log Out first!");
      return;
    }
  }

  // Login - API call
  function loginUser(event) {
    const currentUserId = getCurrentUser();

    if (currentUserId === "0") {
      event.preventDefault();

      const username = document
        .getElementById("usernameInputLogIn")
        .value.trim();
      const password = document.getElementById("passwordInputLogIn").value;

      const loginData = {
        username: username,
        password: password,
      };

      fetch("https://localhost:7084/api/user/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Invalid login");
          return response.json();
        })
        .then((user) => {
          console.log("Login successful:", user);
          alert("You are now logged in!");
          localStorage.setItem("currentUser", user.id);
          window.location.href = "/tracker.html";
        })
        .catch((error) => {
          console.error("Login failed:", error);
          alert("Invalid username or password.");
        });
    } else {
      alert("Log Out first!");
    }
  }

  if (signUpForm) {
    signUpForm.addEventListener("submit", createUser);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  }

  document
    .getElementById("progressTrackerNav")
    .addEventListener("click", function (e) {
      e.preventDefault();

      const currentUser = getCurrentUser();
      if (currentUser && currentUser !== "0") {
        window.location.href = "/tracker.html"; // User is logged in
      } else {
        window.location.href = "/logout.html"; // User not logged in
      }
    });
}

window.onload = loadNavbar();
