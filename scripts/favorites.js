const starButtons = document.querySelectorAll(".star");
const currentUserId = localStorage.getItem("currentUser");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

starButtons.forEach(function (starButton) {
  const itemId = starButton.dataset.id;
  const itemType = starButton.dataset.type; // should be either 'recipe' or 'workout'

  starButton.addEventListener("click", function () {
    const isFavorited = starButton.classList.contains("filled");
    const method = isFavorited ? "DELETE" : "POST";

    const endpoint = `https://localhost:7084/api/user/${
      method === "POST"
        ? `AddFavorite${capitalizeFirstLetter(itemType)}`
        : `RemoveFavorite${capitalizeFirstLetter(itemType)}`
    }`;

    const payload = {
      userId: parseInt(currentUserId),
    };
    payload[`${itemType}Id`] = parseInt(itemId);

    fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${method} request failed`);
        }
        starButton.classList.toggle("filled");
      })
      .catch((error) => {
        console.error("Favorite action failed:", error);
        alert("Something went wrong. Please try again.");
      });
  });
});

function fillFavoriteStars() {
  const userId = localStorage.getItem("currentUser");
  if (!userId || userId === "0") return;

  // Fetch both favorite workouts and recipes
  const fetchWorkouts = fetch(
    `https://localhost:7084/api/user/GetFavoriteWorkouts/${userId}`
  ).then((res) => res.json());
  const fetchRecipes = fetch(
    `https://localhost:7084/api/user/GetFavoriteRecipes/${userId}`
  ).then((res) => res.json());

  Promise.all([fetchWorkouts, fetchRecipes])
    .then(([favWorkouts, favRecipes]) => {
      const favoriteWorkoutIds = favWorkouts.map((w) => w.id.toString());
      const favoriteRecipeIds = favRecipes.map((r) => r.id.toString());

      // Loop through all star buttons
      document.querySelectorAll(".star").forEach((button) => {
        const id = button.dataset.id;
        const type = button.dataset.type;

        const isFav =
          (type === "workout" && favoriteWorkoutIds.includes(id)) ||
          (type === "recipe" && favoriteRecipeIds.includes(id));

        if (isFav) {
          button.classList.add("filled"); // Or toggle class/icon/style
        }
      });
    })
    .catch((error) => {
      console.error("Failed to fetch favorites:", error);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  fillFavoriteStars();
});
