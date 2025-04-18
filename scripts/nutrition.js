const readMoreBtns = document.querySelectorAll(".read-more-btn");

readMoreBtns.forEach((button) => {
  button.addEventListener("click", function () {
    const parentContainer = button.closest(".content-container"); // Merr recetën përkatëse
    const moreContent = parentContainer.querySelectorAll(".more-content"); // Pjesa që do të shfaqet

    // Ndrysho dukshmërinë e përmbajtjes për recetën aktuale
    moreContent.forEach((content) => {
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block"; // Trego përmbajtjen
      } else {
        content.style.display = "none"; // Fshi përmbajtjen
      }
    });

    // Ndrysho tekstin e butonit dhe stilin për recetën aktuale
    button.classList.toggle("clicked");
    if (button.innerHTML === "Read More") {
      button.innerHTML = "Read Less";
    } else {
      button.innerHTML = "Read More";
    }
  });
});
