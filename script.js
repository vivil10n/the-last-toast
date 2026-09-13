const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section, .hero").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

const wishlistGrid = document.getElementById("wishlist-grid");
const arenaUrl =
  "https://api.are.na/v3/channels/vivian-s-22nd-wishlist/contents";

async function loadWishlist() {
  try {
    const response = await fetch(arenaUrl);

    if (!response.ok) {
      throw new Error("Could not load wishlist");
    }

    const data = await response.json();
    const items = data.contents || data || [];

    wishlistGrid.innerHTML = "";

    if (!items.length) {
      wishlistGrid.innerHTML =
        "<p class='loading-text'>no wishlist items yet.</p>";
      return;
    }

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "wishlist-card";

      const title = item.title || "wishlist item";
      const description = item.description || "";

      const link =
        item.source?.url ||
        item.image?.original?.url ||
        item.href ||
        "#";

      const imageUrl =
        item.image?.display?.url ||
        item.image?.large?.url ||
        item.image?.original?.url ||
        item.attachment?.url ||
        "";

      card.innerHTML = `
        ${imageUrl ? `<img src="${imageUrl}" alt="${title}" loading="lazy">` : ""}
        <div class="wishlist-card-text">
          <h3>${title}</h3>
          ${description ? `<p>${description}</p>` : ""}
          ${
            link !== "#"
              ? `<a href="${link}" target="_blank" rel="noopener noreferrer">view item</a>`
              : ""
          }
        </div>
      `;

      wishlistGrid.appendChild(card);
    });
  } catch (error) {
    wishlistGrid.innerHTML = `
      <p class="loading-text">
        wishlist couldn’t load right now. please check back later :-)
      </p>
    `;

    console.error(error);
  }
}

if (wishlistGrid) {
  loadWishlist();
}