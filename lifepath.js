document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("lifePathForm");
  const resultDiv = document.getElementById("result");
  const ctaDiv = document.getElementById("cta");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const birthdate = document.getElementById("birthdate").value;

    if (!birthdate) return;

    const lifePathNumber = calculateLifePath(birthdate);
    resultDiv.textContent = `Tu número de vida es: ${lifePathNumber}`;
    resultDiv.classList.remove("hidden");
    ctaDiv.classList.remove("hidden");
  });

  function calculateLifePath(dateString) {
    const digits = dateString.replace(/-/g, "").split("").map(Number);
    let total = digits.reduce((a, b) => a + b, 0);

    while (total > 9 && ![11, 22, 33].includes(total)) {
      total = total.toString().split("").map(Number).reduce((a, b) => a + b, 0);
    }

    return total;
  }
});