document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("lifepath-form");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dobInput = document.getElementById("dob").value.trim();
    const dobParts = dobInput.split("/");

    if (dobParts.length !== 3) {
      resultDiv.innerHTML = "<p style='color:red;'>Por favor, introduce tu fecha en formato DD/MM/AAAA.</p>";
      return;
    }

    const [day, month, year] = dobParts.map(Number);

    if (
      isNaN(day) || isNaN(month) || isNaN(year) ||
      day < 1 || day > 31 || month < 1 || month > 12 || year < 1000
    ) {
      resultDiv.innerHTML = "<p style='color:red;'>Fecha inválida. Asegúrate de usar el formato DD/MM/AAAA.</p>";
      return;
    }

    const digits = `${day}${month}${year}`.replace(/\D/g, "").split("").map(Number);
    let total = digits.reduce((sum, digit) => sum + digit, 0);

    while (total > 9 && ![11, 22, 33].includes(total)) {
      total = total.toString().split("").reduce((sum, digit) => sum + Number(digit), 0);
    }

    resultDiv.innerHTML = `
      <h3>Tu número de camino de vida es: ${total}</h3>
      <p>¿Quieres saber qué significa? <a href="https://calendly.com/guruobed/30min" target="_blank">Reserva una consulta personalizada</a> con Marlene.</p>
    `;
  });
});
