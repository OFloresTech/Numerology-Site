document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".service-header");

  headers.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content.classList.toggle("open");
    });
  });
});
