const $workoutsList = $("#workoutsList");
const $recipesList = $("#recipesList");

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Save currentUser's Id in localstorage
function saveCurrentUser(current) {
  localStorage.setItem("currentUserData", JSON.stringify(current));
}

// Get currentUser's Id from localstorage
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

// To log out
function logOut() {
  localStorage.setItem("currentUser", "0");
  console.log("You are now logged out.");
  window.location.href = "logout.html";
}
document.getElementById("logoutBtn").addEventListener("click", logOut);

// User profile data
function userProfile() {
  const currentUserID = getCurrentUser();

  if (!currentUserID || currentUserID === "0") {
    console.error("No valid current user ID found.");
    return;
  }

  fetch(`https://localhost:7084/api/user/GetUserById/${currentUserID}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .then((currentUser) => {
      saveCurrentUser(currentUser);

      document.getElementById("user-name").textContent = currentUser.username;
      document.getElementById("user-age").textContent = currentUser.age;
      document.getElementById("user-height").textContent = currentUser.height;
      document.getElementById("user-weight").textContent = currentUser.weight;
      document.getElementById("user-bmi").textContent = currentUser.bmi;

      const bmiElement = document.getElementById("user-bmi");
      bmiElement.style.color = "";
      if (currentUser.bmi < 18.5) {
        bmiElement.style.color = "#ffd700"; // Underweight
      } else if (currentUser.bmi < 25) {
        bmiElement.style.color = "#28a745"; // Normal
      } else {
        bmiElement.style.color = "#dc3545"; // Overweight
      }

      const helloUser = document.getElementById("helloUser");
      if (helloUser) {
        helloUser.textContent = `Hello, ${currentUser.username}!`;
      }
    })
    .catch((error) => {
      console.error("Error loading user profile:", error);
    });
}

function updateProfile() {
  const currentUserID = parseInt(getCurrentUser());

  if (!currentUserID || currentUserID === "0") {
    console.error("No valid user ID found.");
    return;
  }

  // Get updated values from input fields (update with your actual input IDs)
  const updatedUser = {
    username: document.getElementById("usernameUpdate").value,
    age: parseInt(document.getElementById("ageUpdate").value),
    height: parseInt(document.getElementById("heightUpdate").value),
    weight: parseInt(document.getElementById("weightUpdate").value),
  };

  console.log("Sending updated user:", updatedUser);

  // Send PUT request
  fetch(`https://localhost:7084/api/user/UpdateUser/${currentUserID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }
      return response.json();
    })
    .then((updatedUserData) => {
      saveCurrentUser(updatedUserData);
      window.location.href = "./tracker.html";
      alert("Profile updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert("There was a problem updating your profile.");
    });
}
document.getElementById("updateForm").addEventListener("submit", function (e) {
  e.preventDefault();
  updateProfile();
});

function deleteUser() {
  const userId = getCurrentUser();

  if (!userId || userId === "0") {
    alert("You are not logged in.");
    return;
  }

  if (
    !confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
    return;
  }

  fetch(`https://localhost:7084/api/user/DeleteUser/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      return response.text();
    })
    .then(() => {
      alert("Your account has been deleted.");
      localStorage.setItem("currentUser", "0");
      localStorage.removeItem("currentUserData");
      window.location.href = "./logout.html";
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      alert("Something went wrong while deleting your account.");
    });
}
document.getElementById("deleteBtn").addEventListener("click", deleteUser);

// Get Favorite Workouts from database
function fetchFavoriteWorkouts(userId) {
  return fetch(
    `https://localhost:7084/api/user/GetFavoriteWorkouts/${userId}`
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch favorite workouts");
    return res.json();
  });
}

// Get Favorite Recipes from database
function fetchFavoriteRecipes(userId) {
  return fetch(
    `https://localhost:7084/api/user/GetFavoriteRecipes/${userId}`
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch favorite recipes");
    return res.json();
  });
}

// Favorite Workouts Section
function favWorkouts() {
  $workoutsList.html("");

  const currentUserId = getCurrentUser();
  if (!currentUserId || currentUserId === "0") {
    console.error("No valid user logged in.");
    return;
  }

  fetchFavoriteWorkouts(currentUserId)
    .then((workouts) => {
      if (workouts.length === 0) {
        $workoutsList.append(
          "<li class='list-group-item'>No favorite workouts yet.</li>"
        );
        return;
      }

      workouts.forEach((item) => {
        const $workoutListItem = $("<li></li>").addClass(
          "list-group-item mb-2"
        );
        $workoutListItem.html(`
          <div class="d-flex">
            <div>
              <h5 class="mb-1">${item.name}</h5>
              <p class="mb-1">${
                item.description || "No description provided."
              }</p>
            </div>
          </div>
        `);
        $workoutsList.append($workoutListItem);
      });
    })
    .catch((err) => {
      console.error("Error loading favorite workouts:", err);
      $workoutsList.append(
        "<li class='list-group-item text-danger'>Failed to load favorites.</li>"
      );
    });
}

// Favorite Recipes Section
function favRecipes() {
  $recipesList.html("");

  const currentUserId = getCurrentUser();
  if (!currentUserId || currentUserId === "0") {
    console.error("No valid user logged in.");
    return;
  }

  fetchFavoriteRecipes(currentUserId)
    .then((recipes) => {
      if (recipes.length === 0) {
        $recipesList.append(
          "<li class='list-group-item'>No favorite recipes yet.</li>"
        );
        return;
      }

      recipes.forEach((item) => {
        const $recipeListItem = $("<li></li>").addClass("list-group-item mb-2");
        $recipeListItem.html(`
          <div class="d-flex">
            <div>
              <h5 class="mb-1">${item.name}</h5>
              <p class="mb-1">${
                item.description || "No description provided."
              }</p>
            </div>
          </div>
        `);
        $recipesList.append($recipeListItem);
      });
    })
    .catch((err) => {
      console.error("Error loading favorite recipes:", err);
      $recipesList.append(
        "<li class='list-group-item text-danger'>Failed to load favorites.</li>"
      );
    });
}

$(document).ready(function () {
  userProfile();
  favWorkouts();
  favRecipes();
});
