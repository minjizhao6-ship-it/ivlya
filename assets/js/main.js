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

});
