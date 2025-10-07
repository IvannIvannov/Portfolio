let achievementShown = false;

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  // Ако достигнем долната част на страницата
  if (!achievementShown && scrollPosition >= pageHeight - 10) {
    showAchievement('🎉 You reached the bottom! 🎉');
    achievementShown = true; // показваме само веднъж
  }
});

function showAchievement(message) {
  const achievement = document.getElementById('achievement');
  achievement.querySelector('span').textContent = message;
  achievement.classList.add('show');

  setTimeout(() => {
    achievement.classList.remove('show');
  }, 2000);
}
