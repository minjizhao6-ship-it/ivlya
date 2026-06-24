const toggle = document.querySelector("[data-menu-toggle]");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

const quoteForm = document.querySelector("[data-quote-form]");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = quoteForm.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "Thanks. Your request is ready to be sent to the IVLYA sales team.";
    }
    quoteForm.reset();
  });
}
