document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".service-header");

  headers.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content.classList.toggle("open");
    });
  });
});

// Load Calendly widget script dynamically if not already loaded
(function loadCalendlyScript() {
  if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.type = "text/javascript";
    document.head.appendChild(script);
  }
})();

// Function to attach click handlers to all Calendly buttons
function attachCalendlyButtons() {
  document.querySelectorAll('.calendly-button').forEach(button => {
    button.addEventListener('click', () => {
      const url = button.getAttribute('data-url');
      Calendly.showPopupWidget(url);
    });
  });
}

// If Calendly widget is ready, attach handlers immediately, otherwise wait for load
if (window.Calendly) {
  attachCalendlyButtons();
} else {
  window.addEventListener('load', attachCalendlyButtons);
}
