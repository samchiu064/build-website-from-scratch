const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.getElementById("season");
const edibleFilter = document.getElementById("edible");
const noMatchesMessage = document.querySelector(".no-matches");

const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index) => {
  const mushroomId = `mushroom-card-${index}`;
  card.style.viewTransitionName = mushroomId;
});

seasonalFilter.addEventListener("change", filterMushrooms);
edibleFilter.addEventListener("change", filterMushrooms);

function filterMushrooms(event) {
  const { name, value } = event.target;
  currentFilters[name] = value;

  if (!document.startViewTransition) {
    filterCards();
    return;
  }

  document.startViewTransition(() => {
    filterCards();
  });
}

function filterCards() {
  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    const matchesSeason = currentFilters.season === "all" || season === currentFilters.season;
    const matchesEdible = currentFilters.edible === "all" || edible === currentFilters.edible;

    if (matchesSeason && matchesEdible) {
      card.hidden = false;
    } else {
      card.hidden = true;
    }
  });
  const anyVisible = Array.from(cards).some((card) => !card.hidden);
  noMatchesMessage.hidden = anyVisible;
}

const resizeObserver = new ResizeObserver(() => {
  document.body.classList.add("resizing");

  requestAnimationFrame(() => {
    document.body.classList.remove("resizing");
  });
});

resizeObserver.observe(document.body);
