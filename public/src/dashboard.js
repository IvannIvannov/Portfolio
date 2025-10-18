async function loadDashboard() {
    try {
        const res = await fetch("/api/views");
        const pages = await res.json();

        let totalVisits = 0;
        pages.forEach(p => totalVisits += p.views);
        document.getElementById("total-visits").textContent = totalVisits;

        // === Активни потребители за днешната дата ===
        const today = new Date().toISOString().split("T")[0];
        const key = "activeUsers_" + today;

        // Вземаме текущия списък с активни потребители
        let activeUsers = JSON.parse(localStorage.getItem(key)) || [];

        // Уникален userID за всеки браузър
        let userId = localStorage.getItem("userId");
        if (!userId) {
            userId = Math.random().toString(36).substring(2, 10);
            localStorage.setItem("userId", userId);
        }

        // Добавяме потребителя, ако още не е в днешния списък
        if (!activeUsers.includes(userId)) {
            activeUsers.push(userId);
            localStorage.setItem(key, JSON.stringify(activeUsers));
        }

        // Показваме броя на активните потребители за деня
        document.getElementById("active-today").textContent = activeUsers.length;

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
