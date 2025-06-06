document.addEventListener("DOMContentLoaded", function () {
  const dobInput = document.getElementById("dob");

  dobInput.addEventListener("input", function (e) {
    let value = dobInput.value;
    
    // Remove all non-digit characters
    value = value.replace(/\D/g, "");

    // Limit to 8 digits max (DDMMYYYY)
    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    // Add slashes as the user types: DD/MM/YYYY
    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    dobInput.value = value;
  });

  // Your existing form submit logic goes here (or in the same file)
  const form = document.getElementById("lifepath-form");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dobInputValue = dobInput.value.trim();
    const dobParts = dobInputValue.split("/");

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

    const isValidDate = (d, m, y) => {
      const date = new Date(y, m - 1, d);
      return date && (date.getMonth() + 1) === m && date.getDate() === d && date.getFullYear() === y;
    };

    if (!isValidDate(day, month, year)) {
      resultDiv.innerHTML = "<p style='color:red;'>Fecha inválida. Por favor verifica el día, mes y año.</p>";
      return;
    }

    const digits = `${day}${month}${year}`.split("").map(Number);
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
