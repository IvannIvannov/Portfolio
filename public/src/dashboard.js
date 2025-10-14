document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/views');
        const data = await res.json();

        const labels = data.map(d => d.page);
        const views = data.map(d => d.views);

        const ctx = document.getElementById('viewsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Page Views',
                    data: views,
                    backgroundColor: 'rgba(97, 218, 251, 0.6)',
                    borderColor: 'rgba(97, 218, 251, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Page Views per Page' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } catch (err) {
        console.error('Error loading dashboard data', err);
    }
});
