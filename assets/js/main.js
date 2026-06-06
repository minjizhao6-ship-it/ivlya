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

  var redirectInput = document.getElementById("form-redirect");
  if (redirectInput) {
    redirectInput.value = new URL("thank-you.html", window.location.href).href;
  }

  var quoteForm = document.getElementById("quote-form");
  if (quoteForm) {
    var submitButton = quoteForm.querySelector('button[type="submit"]');
    var formStatus = document.getElementById("form-status");

    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      var payload = { access_key: "1d063c0a-5d72-40cc-9917-fe0e6217bf0a" };
      new FormData(quoteForm).forEach(function (value, key) {
        if (key !== "botcheck") {
          payload[key] = value;
        }
      });
      payload.subject = "New IVLYA quote request";
      payload.from_name = "IVLYA Website";

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
            window.location.href = redirectInput
              ? redirectInput.value
              : new URL("thank-you.html", window.location.href).href;
            return;
          }

          throw new Error(data.message || "Submission failed");
        })
        .catch(function (error) {
          if (formStatus) {
            formStatus.hidden = false;
            formStatus.textContent =
              error && error.message
                ? error.message
                : "Something went wrong. Please try again or contact us on WhatsApp.";
            formStatus.className = "form-status form-status-error";
          } else {
            window.alert("Something went wrong. Please try again or contact us on WhatsApp.");
          }

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Request a Quote";
          }
        });
    });
  }
});
