document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".feedback-track");
  const slides = Array.from(track.children);
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!track || slides.length === 0 || !dotsContainer) return;

  // Колко карти се виждат според ширината на екрана
  function getVisibleCount() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  let visibleCount = getVisibleCount();
  let totalSteps = Math.max(slides.length - visibleCount + 1, 1);
  let index = 0;

  // Създаваме точките според броя стъпки
  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSteps; i++) {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
    return Array.from(dotsContainer.children);
  }

  let dots = createDots();

  function updateDots() {
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function updatePosition() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || "0");
    const offset = (slideWidth + gap) * index;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function goTo(i) {
    if (totalSteps <= 1) return;
    index = (i + totalSteps) % totalSteps; // wrap around
    track.style.transition = "transform 0.5s ease";
    updatePosition();
    updateDots();
  }

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  // Autoplay
  let interval = setInterval(() => {
    goTo(index + 1);
  }, 3000);

  // При resize – преизчисляваме layout-а
  window.addEventListener("resize", () => {
    const oldVisible = visibleCount;
    visibleCount = getVisibleCount();
    const newTotal = Math.max(slides.length - visibleCount + 1, 1);

    if (newTotal !== totalSteps || oldVisible !== visibleCount) {
      totalSteps = newTotal;
      index = 0;
      dots = createDots();
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => goTo(i));
      });
      track.style.transition = "none";
      updatePosition();
    }
  });

  // първоначална позиция
  track.style.transition = "none";
  updatePosition();
});
