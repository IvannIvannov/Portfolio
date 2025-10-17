async function loadDashboard() {
    try {
        const res = await fetch("/api/views");
        const pages = await res.json();

        let totalVisits = 0;
        let topPage = "-";
        let maxViews = 0;

        pages.forEach(p => {
            totalVisits += p.views;
            if (p.views > maxViews) {
                maxViews = p.views;
                topPage = p.page.replace("/", "Home"); // пример за Home
            }
        });

        document.getElementById("total-visits").textContent = totalVisits;
        document.getElementById("top-page").textContent = topPage;
    } catch (err) {
        console.error("Error loading dashboard:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Увеличаваме посещението на страницата
    fetch('/api/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname })
    });
    loadDashboard();
});
