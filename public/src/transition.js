barba.init({
    transitions: [
        {
            name: 'fade-transition',
            leave(data) {
                return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
            },
            enter(data) {
                return gsap.from(data.next.container, { opacity: 0, duration: 0.5 });
            },
            once(data) {
                fadeInElements(data.next.container);
            }
        }
    ],
    views: [
        {
            namespace: 'projects',
            afterEnter() {
                fadeInProjects();
            }
        },
        {
            namespace: 'about',
            afterEnter() {
                fadeInElements(document.querySelectorAll('.about-main, .certificates-section, .skills-section'));
            }
        },
        {
            namespace: 'contact',
            afterEnter() {
                fadeInElements(document.querySelectorAll('.contact-wrapper'));
            }
        },
        {
            namespace: 'home',
            afterEnter() {
                fadeInElements(document.querySelectorAll('.hero, .about-preview, .dashboard, .feedback'));
            }
        }
    ]
});

function fadeInElements(elements) {
    if (!elements) return;
    if (elements instanceof NodeList || Array.isArray(elements)) {
        elements.forEach(el => gsap.from(el, { opacity: 0, y: 30, duration: 0.7, stagger: 0.2 }));
    } else {
        gsap.from(elements, { opacity: 0, y: 30, duration: 0.7, stagger: 0.2 });
    }
}

function fadeInProjects() {
    const projects = document.querySelectorAll('.project');
    if (!projects) return;
    projects.forEach(project => project.classList.remove('visible'));
    const triggerBottom = window.innerHeight * 0.85;
    projects.forEach(project => {
        const projectTop = project.getBoundingClientRect().top;
        if (projectTop < triggerBottom) {
            project.classList.add('visible');
        }
    });
    window.addEventListener('scroll', () => {
        projects.forEach(project => {
            const projectTop = project.getBoundingClientRect().top;
            if (projectTop < triggerBottom) project.classList.add('visible');
        });
    });
}

const backBtn = document.getElementById('backToTop');
if (backBtn) {
    window.addEventListener('scroll', () => {
        backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

console.log("Barba transition script loaded");
barba.hooks.after(() => {
    console.log("Barba transition executed");
});
