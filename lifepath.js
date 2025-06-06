document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("lifepath-form");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let dobInput = document.getElementById("dob").value.trim();

    // Remove all non-digit characters
    const digitsOnly = dobInput.replace(/\D/g, "");

    // Check if we have exactly 8 digits (MMDDYYYY)
    if (digitsOnly.length !== 8) {
      resultDiv.innerHTML = "<p style='color:red;'>Por favor, introduce 8 dígitos para la fecha (MMDDAAAA o DDMMAAAA).</p>";
      return;
    }

    // Format as MM/DD/YYYY
    const month = digitsOnly.substring(0, 2);
    const day = digitsOnly.substring(2, 4);
    const year = digitsOnly.substring(4);

    // Optionally validate month/day/year ranges
    const monthNum = Number(month);
    const dayNum = Number(day);
    const yearNum = Number(year);

    if (
      monthNum < 1 || monthNum > 12 ||
      dayNum < 1 || dayNum > 31 ||
      yearNum < 1000
    ) {
      resultDiv.innerHTML = "<p style='color:red;'>Fecha inválida. Asegúrate de que el mes, día y año sean correctos.</p>";
      return;
    }

 
    const formattedDate = `${day}/${month}/${year}`;

    // Calculate life path number
    const digits = formattedDate.replace(/\D/g, "").split("").map(Number);
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
