async function loadDashboard() {
    try {
        const res = await fetch("/api/views");
        const pages = await res.json();

        let totalVisits = 0;
        pages.forEach(p => totalVisits += p.views);

        const today = new Date().toISOString().split("T")[0];
        const key = "activeUsers_" + today;

        let activeUsers = JSON.parse(localStorage.getItem(key)) || [];

        let userId = localStorage.getItem("userId");
        if (!userId) {
            userId = Math.random().toString(36).substring(2, 10);
            localStorage.setItem("userId", userId);
        }

        if (!activeUsers.includes(userId)) {
            activeUsers.push(userId);
            localStorage.setItem(key, JSON.stringify(activeUsers));
        }

        // Съхраняваме стойностите, но не анимираме веднага
        document.getElementById("total-visits").dataset.target = totalVisits;
        document.getElementById("active-today").dataset.target = activeUsers.length;

    } catch (err) {
        console.error("Error loading dashboard:", err);
    }
}

// Функция за анимация на числата
function animateNumber(el) {
    const target = parseInt(el.dataset.target, 10);
    let count = 0;
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            el.textContent = target;
            clearInterval(interval);
        } else {
            el.textContent = count;
        }
    }, 10);
}

// Проверка дали елементът е видим в прозореца
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

// Скрол ефект за картите и числата
function revealStats() {
    document.querySelectorAll('.stat-card').forEach(card => {
        if (isInViewport(card) && !card.classList.contains('visible')) {
            card.classList.add('visible');
            const numberEl = card.querySelector('.stat-number');
            animateNumber(numberEl);
        }
    });
}

window.addEventListener('scroll', revealStats);
window.addEventListener('load', revealStats);

document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname })
    });

    loadDashboard();
});
