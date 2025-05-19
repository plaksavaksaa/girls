const caption = document.getElementById("caption");
const cursorLabel = document.getElementById("cursorLabel");
const items = document.querySelectorAll(".item");
const music = document.getElementById("forest-music");

let typeInterval;
let isTyping = false;

const overlayLeft = document.getElementById("overlayLeft");
const overlayRight = document.getElementById("overlayRight");

const seen = {
  bed: false,
  panties: false,
  fluttershy: false,
  door: false,
};

function checkCompletion() {
  return Object.values(seen).every(v => v === true);
}

document.querySelectorAll(".nav-zone").forEach(zone => {
  const direction = zone.dataset.direction;
  const overlay = direction === "left" ? overlayLeft : overlayRight;

  zone.addEventListener("mouseenter", () => {
    if (checkCompletion()) overlay.style.opacity = "1";
  });

  zone.addEventListener("mouseleave", () => {
    overlay.style.opacity = "0";
  });

  zone.addEventListener("click", () => {
    if (checkCompletion()) {
      window.location.href = "ending.html";
    }
  });
});

function typeText(text, speed = 30) {
  clearInterval(typeInterval);
  isTyping = true;
  caption.textContent = "";

  let i = 0;
  function type() {
    if (i < text.length) {
      caption.textContent += text.charAt(i);
      i++;
      typeInterval = setTimeout(type, speed);
    } else {
      isTyping = false;
    }
  }

  type();
}

items.forEach(item => {
  const name = item.dataset.label;
  const label = name?.startsWith("look to") ? name : `look to ${name}`;
  const message = item.dataset.caption;

  item.addEventListener("mousemove", (e) => {
    cursorLabel.textContent = label;
    cursorLabel.style.left = `${e.clientX + 10}px`;
    cursorLabel.style.top = `${e.clientY + 10}px`;
    cursorLabel.style.opacity = "1";
  });

  item.addEventListener("mouseleave", () => {
    cursorLabel.style.opacity = "0";
  });

  item.addEventListener("click", () => {
    if (message && !isTyping) {
      typeText(message);
      if (name in seen) seen[name] = true;
    }
  });
});
