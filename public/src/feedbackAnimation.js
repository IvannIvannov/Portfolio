document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".feedback-track");
  const slides = Array.from(track.children);

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const dotsContainer = document.querySelector(".carousel-dots");

  // Clone first & last slide → smooth infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let index = 1;
  const totalSlides = slides.length + 2;

  track.style.transform = `translateX(-${index * 100}%)`;

  // Dots
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

  track.addEventListener("transitionend", () => {
    if (track.children[index].classList.contains("clone")) {
      track.style.transition = "none";
      index = index === 0 ? slides.length : 1;
      track.style.transform = `translateX(-${index * 100}%)`;
    }
    updateDots();
  });

  nextBtn.addEventListener("click", () => moveToSlide(index + 1));
  prevBtn.addEventListener("click", () => moveToSlide(index - 1));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => moveToSlide(i + 1));
  });

  setInterval(() => {
    moveToSlide(index + 1);
  }, 3000);
});
