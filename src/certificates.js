const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const certificates = track.children;
const cloneCount = 3;
for (let i = 0; i < cloneCount; i++) {
    const clone = certificates[i].cloneNode(true);
    track.appendChild(clone);
}

function scrollNext() {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
        track.scrollLeft = 0;
    } else {
        track.scrollBy({ left: 300, behavior: 'smooth' });
    }
}

function scrollPrev() {
    if (track.scrollLeft <= 0) {
        track.scrollLeft = track.scrollWidth - track.clientWidth;
    } else {
        track.scrollBy({ left: -300, behavior: 'smooth' });
    }
}

nextBtn.addEventListener('click', scrollNext);
prevBtn.addEventListener('click', scrollPrev);

setInterval(scrollNext, 5000);
