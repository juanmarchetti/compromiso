document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initCelebration();
});

/**
 * Crea corazones flotando en el fondo usando JS para posiciones aleatorias.
 */
function initParticles() {
    const container = document.getElementById('particles-js');
    const numHearts = 30; // Número de corazones flotantes
    const hearts = ['❤️', '💖', '✨', '💕', '💍'];

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        
        // Elegir un emoji aleatorio
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Posición horizontal aleatoria
        heart.style.left = `${Math.random() * 100}vw`;
        
        // Retraso de animación aleatorio para que no suban todos a la vez
        const delay = Math.random() * 15;
        heart.style.animationDelay = `${delay}s`;
        
        // Duración aleatoria (algunos suben más rápido que otros)
        const duration = 10 + Math.random() * 10;
        heart.style.animationDuration = `${duration}s`;
        
        // Tamaño aleatorio
        const scale = 0.5 + Math.random();
        heart.style.transform = `scale(${scale})`;
        
        container.appendChild(heart);
    }
}

/**
 * Intersection Observer para activar la clase .visible 
 * cuando el usuario hace scroll hacia abajo (efecto fade-in).
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Activar inmediatamente los elementos que ya están en pantalla al cargar
    setTimeout(() => {
        document.querySelectorAll('.hero.fade-in').forEach(el => el.classList.add('visible'));
    }, 100);
}

/**
 * Lógica del botón de celebración (Confeti y mensaje final)
 */
function initCelebration() {
    const btn = document.getElementById('btnCelebrate');
    const msg = document.getElementById('celebrationMessage');

    if (!btn || !msg) return;

    btn.addEventListener('click', () => {
        // Ocultar botón
        btn.style.display = 'none';
        
        // Mostrar mensaje con animación
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('visible'), 50);

        // Disparar confeti (requiere la librería canvas-confetti en el HTML)
        fireConfetti();
    });
}

function fireConfetti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        // Lanzar desde la izquierda
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ffb3c1', '#ffffff', '#d4af37']
        });
        
        // Lanzar desde la derecha
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ffb3c1', '#ffffff', '#d4af37']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
