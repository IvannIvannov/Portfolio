let achievementShown = false;
const actions = {
    visitedHome: false,
    visitedProjects: false,
    visitedAbout: false,
    visitedContact: false,
    clickedProjectBtn: false,
    clickedContactBtn: false,
    reachedBottom: false
};

function updateProgress() {
    const completed = Object.values(actions).filter(v => v).length;
    const progress = (completed / Object.keys(actions).length) * 100;

    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    if (progressBar && progressText) {
        progressBar.style.width = progress + "%";
        progressText.textContent = Math.floor(progress) + "%";
    }

    if (progress >= 100 && !achievementShown) {
        achievementShown = true;
        showAchievement("Achievement Unlocked: Full Exploration!");
    }
}

function showAchievement(text) {
    const ach = document.createElement("div");
    ach.textContent = text;
    ach.style.position = "fixed";
    ach.style.top = "20px";
    ach.style.right = "20px";
    ach.style.background = "#00ff00";
    ach.style.color = "#000";
    ach.style.padding = "12px 20px";
    ach.style.fontFamily = "'Press Start 2P', cursive";
    ach.style.fontSize = "0.7rem";
    ach.style.border = "2px solid #000";
    ach.style.borderRadius = "4px";
    ach.style.zIndex = "9999";
    ach.style.boxShadow = "0 0 10px #00ff00";
    ach.style.animation = "pulse 1s ease-in-out infinite";
    document.body.appendChild(ach);

    setTimeout(() => ach.remove(), 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    // Страница
    const path = window.location.pathname;
    if (path.includes("index.html")) actions.visitedHome = true;
    if (path.includes("projects.html")) actions.visitedProjects = true;
    if (path.includes("about.html")) actions.visitedAbout = true;
    if (path.includes("contact.html")) actions.visitedContact = true;
    updateProgress();

    // Бутоните
    const projectBtn = document.querySelector(".btn[href='/projects/projects.html']");
    const contactBtn = document.querySelector(".btn[href='/contact/contact.html']");
    if (projectBtn) projectBtn.addEventListener("click", () => {
        if (!actions.clickedProjectBtn) {
            actions.clickedProjectBtn = true;
            updateProgress();
        }
    });
    if (contactBtn) contactBtn.addEventListener("click", () => {
        if (!actions.clickedContactBtn) {
            actions.clickedContactBtn = true;
            updateProgress();
        }
    });

    // Scroll до края на страницата
    window.addEventListener("scroll", () => {
        if (!actions.reachedBottom && (window.innerHeight + window.scrollY >= document.body.scrollHeight)) {
            actions.reachedBottom = true;
            updateProgress();
        }
    });
});

// Pulse анимация
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0,255,0,0.6); }
    70% { box-shadow: 0 0 0 12px rgba(0,255,0,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,255,0,0); }
}`;
document.head.appendChild(style);
