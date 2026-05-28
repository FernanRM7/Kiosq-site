// Per-character-rise effect for heroText h1
// Splits h1 into spans and animates each character with a rise effect

function animatePerCharacterRise() {
  const h1 = document.querySelector(".hero-text-animated");
  if (!h1) {
    return;
  }

  const nodes = [...h1.childNodes];
  const fragment = document.createDocumentFragment();
  h1.innerHTML = "";
  h1.classList.add("hero-text-prepared");

  let charIndex = 0;
  for (const node of nodes) {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BR") {
      fragment.append(document.createElement("br"));
    } else if (node.nodeType === Node.TEXT_NODE) {
      const chars = [...node.textContent];
      for (const char of chars) {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "hero-text-character";
        span.style.setProperty("--hero-character-delay", `${charIndex * 28}ms`);
        fragment.append(span);
        charIndex += 1;
      }
    }
  }

  h1.append(fragment);

  requestAnimationFrame(() => {
    h1.classList.add("hero-text-visible");
  });
}

document.addEventListener("DOMContentLoaded", animatePerCharacterRise);
