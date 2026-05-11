const navToggle = document.querySelector("[aria-controls='primary-nav']");
const primaryNav = document.getElementById("primary-nav");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
  navToggle.setAttribute("aria-expanded", !expanded);
  primaryNav.classList.toggle("active");
});
