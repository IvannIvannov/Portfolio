document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".feedback-track");
  const slides = Array.from(track.children);
  const dotsContainer = document.querySelector(".carousel-dots");

  // Clone first & last slide → smooth infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let index = 1; // Start from the first real slide

  track.style.transform = `translateX(-${index * 100}%)`;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateDots() {
    dots.forEach(d => d.classList.remove("active"));
    dots[(index - 1 + slides.length) % slides.length].classList.add("active");
  }

  function moveToSlide(i) {
    track.style.transition = "transform 0.5s ease";
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // Infinite loop fix after transition
  track.addEventListener("transitionend", () => {
    const currentSlide = track.children[index];
    if (currentSlide.classList.contains("clone")) {
      track.style.transition = "none";
      index = index === 0 ? slides.length : 1;
      track.style.transform = `translateX(-${index * 100}%)`;
    }
    updateDots();
  });

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => moveToSlide(i + 1));
  });

  // Autoplay
  setInterval(() => {
    moveToSlide(index + 1);
  }, 3000);
});
