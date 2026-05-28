const imagesScript = document.querySelector("#hero-carousel-images");
const raw = imagesScript?.textContent?.trim() ?? "";
let images = [];

if (raw) {
  try {
    images = JSON.parse(raw);
  } catch {
    images = [];
  }
}

const hasImages = Array.isArray(images) && images.length > 0;

const DURATION =
  Number.parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--carousel-duration"
    ),
    10
  ) || 8000;

const PROGRESS_COLOR =
  getComputedStyle(document.documentElement).getPropertyValue(
    "--color-primary"
  ) || "#2563eb";

let current = 0;
let interval = null;
const imgEl = document.querySelector("#hero-carousel-img");

function setActiveTab(idx) {
  if (!hasImages || !images[idx] || !imgEl) {
    return;
  }

  const tabs = document.querySelectorAll(".hero-carousel-tab");
  for (let i = 0; i < tabs.length; i += 1) {
    const tab = tabs[i];
    tab.classList.toggle("active", i === idx);
    tab.style.background = i === idx ? "var(--color-muted, #f3f4f6)" : "";
    const bar = tab.querySelector(".hero-carousel-progress");
    if (bar) {
      if (i === idx) {
        bar.style.transition = "none";
        bar.style.width = "0%";
        bar.style.background = PROGRESS_COLOR;
        setTimeout(() => {
          bar.style.transition = `width ${DURATION}ms linear`;
          bar.style.width = "100%";
        }, 50);
      } else {
        bar.style.transition = "none";
        bar.style.width = "0%";
      }
    }
  }

  imgEl.style.transition = "opacity 0.5s cubic-bezier(.4,0,.2,1)";
  imgEl.style.opacity = "0";
  setTimeout(() => {
    imgEl.src = images[idx].src;
    imgEl.alt = images[idx].alt;
    imgEl.style.opacity = "1";
  }, 400);
}

function nextTab() {
  if (!hasImages) {
    return;
  }
  current = (current + 1) % images.length;
  setActiveTab(current);
}

function startCarousel() {
  if (!hasImages) {
    return;
  }
  setActiveTab(current);
  interval = setInterval(nextTab, DURATION);
}

function stopCarousel() {
  clearInterval(interval);
}

function handleTabClick(idx) {
  stopCarousel();
  current = idx;
  setActiveTab(current);
  startCarousel();
}

window.addEventListener("DOMContentLoaded", () => {
  if (!hasImages) {
    return;
  }
  startCarousel();

  const tabEls = document.querySelectorAll(".hero-carousel-tab");
  for (const [idx, tab] of tabEls.entries()) {
    tab.addEventListener("click", handleTabClick.bind(null, idx));
  }
});
