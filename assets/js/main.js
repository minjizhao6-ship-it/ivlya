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
    var formStatus = document.getElementById("form-status");
    var submitButton = quoteForm.querySelector('button[type="submit"]');

    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var accessKey = quoteForm.getAttribute("data-access-key");
      if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
        if (formStatus) {
          formStatus.hidden = false;
          formStatus.textContent = "Form is not configured yet. Please contact us on WhatsApp.";
          formStatus.className = "form-status form-status-error";
        }
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      var formData = new FormData(quoteForm);
      formData.append("access_key", accessKey);
      formData.append("subject", "New IVLYA quote request");
      formData.append("from_name", "IVLYA Website");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            window.location.href = quoteForm.getAttribute("action") || "thank-you.html";
            return;
          }

          throw new Error(data.message || "Submission failed");
        })
        .catch(function () {
          if (formStatus) {
            formStatus.hidden = false;
            formStatus.textContent = "Something went wrong. Please try again or contact us on WhatsApp.";
            formStatus.className = "form-status form-status-error";
          }
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Request a Quote";
          }
        });
    });
  }
});
