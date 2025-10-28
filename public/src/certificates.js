const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const certificates = track.children;
const scrollAmount = 300;

function scrollNext() {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth) return;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function scrollPrev() {
    if (track.scrollLeft <= 0) return;
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
}

nextBtn.addEventListener('click', scrollNext);
prevBtn.addEventListener('click', scrollPrev);

setInterval(() => {
    if (track.scrollLeft + track.clientWidth < track.scrollWidth) {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}, 5000);
