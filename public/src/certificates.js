const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const scrollAmount = 300; 
let isScrolling = false;

function scrollNext() {
    if (isScrolling) return;
    isScrolling = true;

    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft + scrollAmount >= maxScroll) {
        const remaining = maxScroll - track.scrollLeft;
        track.scrollBy({ left: remaining, behavior: 'smooth' });

        setTimeout(() => {
            track.scrollLeft = 0;
            isScrolling = false;
        }, 500);
    } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setTimeout(() => isScrolling = false, 500);
    }
}

function scrollPrev() {
    if (isScrolling) return;
    isScrolling = true;

    if (track.scrollLeft - scrollAmount <= 0) {
        track.scrollLeft = track.scrollWidth - track.clientWidth;
        isScrolling = false;
    } else {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setTimeout(() => isScrolling = false, 500);
    }
}

nextBtn.addEventListener('click', scrollNext);
prevBtn.addEventListener('click', scrollPrev);

setInterval(scrollNext, 3000);