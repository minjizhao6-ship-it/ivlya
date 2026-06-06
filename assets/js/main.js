document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll(".faq-question").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".faq-item");
      if (!item) return;
      item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(item.classList.contains("open")));
    });
  });

  var quoteForm = document.getElementById("quote-form");
  if (quoteForm) {
    var submitButton = quoteForm.querySelector('button[type="submit"]');

    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      var payload = {};
      new FormData(quoteForm).forEach(function (value, key) {
        if (key !== "redirect" && key !== "botcheck") {
          payload[key] = value;
        }
      });

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            window.location.assign(new URL("thank-you.html", window.location.href).href);
            return;
          }

          throw new Error(data.message || "Submission failed");
        })
        .catch(function (error) {
          window.alert(
            error && error.message
              ? error.message
              : "Something went wrong. Please try again or contact us on WhatsApp."
          );

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Request a Quote";
          }
        });
    });
  }
});
