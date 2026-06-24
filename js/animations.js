/* ================================================
   Hainan Huirui Trading Co., Ltd.
   Animations JavaScript
   ================================================ */

// Particle System
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            count: options.count || 20,
            colors: options.colors || ['#0066cc', '#00b4d8', '#ff6b35'],
            speed: options.speed || 1,
            size: options.size || 10
        };
        this.particles = [];
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * this.options.size + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) / this.options.speed + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        return particle;
    }
    
    init() {
        for (let i = 0; i < this.options.count; i++) {
            const particle = this.createParticle();
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    destroy() {
        this.particles.forEach(p => p.remove());
        this.particles = [];
    }
}

// Initialize particles on hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        heroSection.appendChild(particleContainer);
        
        const particles = new ParticleSystem(particleContainer, {
            count: 30,
            colors: ['#0066cc', '#00b4d8', '#ff6b35', '#e6f2ff'],
            speed: 0.8,
            size: 8
        });
        particles.init();
    }
});

// Mouse Move Effect
function initMouseMoveEffect() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        heroVisual.style.transform = `translateY(-50%) translateX(${mouseX * 30}px) translateY(${mouseY * 30}px)`;
    });
}

initMouseMoveEffect();

// Card Tilt Effect
function initCardTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .feature-card, .news-card');
    
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}

initCardTiltEffect();

// Text Reveal Animation
function initTextReveal() {
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    revealTexts.forEach(function(text) {
        const words = text.textContent.split(' ');
        text.innerHTML = words.map((word, i) => 
            `<span class="word" style="animation-delay: ${i * 0.1}s">${word}</span>`
        ).join(' ');
    });
}

initTextReveal();

// Marquee Animation
function initMarquee() {
    const marquees = document.querySelectorAll('.marquee-container');
    
    marquees.forEach(function(container) {
        const content = container.innerHTML;
        container.innerHTML = content + content;
    });
}

initMarquee();

// Ripple Effect
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-ripple, .btn');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
}

initRippleEffect();

// Magnetic Effect for Buttons
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .social-link');
    
    magneticElements.forEach(function(element) {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = '';
        });
    });
}

initMagneticEffect();

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const bar = progressBar.querySelector('.scroll-progress-bar');
    
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: transparent;
        z-index: 10000;
    `;
    
    bar.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #0066cc, #00b4d8);
        width: 0%;
        transition: width 0.1s ease;
    `;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
}

initScrollProgress();

// Animated Background Gradient
function initAnimatedGradient() {
    const gradientSections = document.querySelectorAll('.animated-gradient');
    
    gradientSections.forEach(function(section) {
        let hue = 200;
        
        setInterval(function() {
            hue = hue >= 360 ? 200 : hue + 1;
            section.style.background = `linear-gradient(135deg, hsl(${hue}, 80%, 50%), hsl(${hue + 40}, 80%, 60%))`;
        }, 50);
    });
}

initAnimatedGradient();

// Typewriter Effect
class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.text = element.textContent;
        this.speed = options.speed || 50;
        this.delay = options.delay || 0;
        this.cursor = options.cursor || '|';
        this.loop = options.loop || false;
        this.loopDelay = options.loopDelay || 2000;
    }
    
    init() {
        this.element.textContent = '';
        this.element.style.borderRight = '2px solid #0066cc';
        
        setTimeout(() => this.type(), this.delay);
    }
    
    type() {
        let i = 0;
        const timer = setInterval(() => {
            if (i < this.text.length) {
                this.element.textContent += this.text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                
                if (this.loop) {
                    setTimeout(() => {
                        this.element.textContent = '';
                        this.type();
                    }, this.loopDelay);
                } else {
                    setTimeout(() => {
                        this.element.style.borderRight = 'none';
                    }, 1000);
                }
            }
        }, this.speed);
    }
}

// Initialize typewriter on elements with class 'typewriter-effect'
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElements = document.querySelectorAll('.typewriter-effect');
    typewriterElements.forEach(function(el) {
        const tw = new Typewriter(el, {
            speed: 50,
            delay: 500,
            loop: false
        });
        tw.init();
    });
});

// Smooth Page Transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('//')) return;
            
            e.preventDefault();
            
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(function() {
                window.location.href = href;
            }, 300);
        });
    });
    
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
}

initPageTransitions();

// Export for use
window.HuiruiAnimations = {
    ParticleSystem,
    Typewriter
};
