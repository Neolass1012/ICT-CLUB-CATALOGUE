const cards = [...document.querySelectorAll(".card")];
const filters = [...document.querySelectorAll(".filter")];
const search = document.querySelector("#search");
let selected = "all";
let cart = 0;

function updateCards() {
  const term = search.value.toLowerCase();
  cards.forEach((card) => {
    const matches =
      (selected === "all" || card.dataset.type === selected) &&
      card.dataset.name.toLowerCase().includes(term);
    card.classList.toggle("hidden", !matches);
  });
}

filters.forEach((filter) =>
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    selected = filter.dataset.filter;
    updateCards();
  }),
);

search.addEventListener("input", updateCards);

document.querySelectorAll(".add").forEach((button) =>
  button.addEventListener("click", (event) => {
    if (!event.currentTarget.closest(".card")) return;
    cart += 1;
    document.querySelector("#cartCount").textContent = cart;
    event.currentTarget.textContent = "Added ✓";
    setTimeout(() => (event.currentTarget.textContent = "Add"), 1100);
  }),
);

document.querySelectorAll(".details").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#dialogTitle").textContent = button.dataset.title;
    document.querySelector("#dialogInfo").textContent = button.dataset.info;
    document.querySelector("#detailsDialog").showModal();
  }),
);

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.style.animationDelay = `${Math.min(entry.target.offsetTop / 1000, 0.35)}s`;
    }),
  { threshold: 0.12 },
);

cards.forEach((card) => observer.observe(card));
