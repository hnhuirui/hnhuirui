/* ================================================
   Hainan Huirui Trading Co., Ltd.
   Components JavaScript
   ================================================ */

// Header Component
class Header {
    constructor() {
        this.header = document.querySelector('.header');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.createMobileMenu();
    }
    
    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleScroll() {
        if (window.pageYOffset > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
    
    handleResize() {
        if (window.innerWidth > 992) {
            this.closeMobileMenu();
        }
    }
    
    createMobileMenu() {
        if (!this.menuToggle || !this.mobileMenu) return;
        
        this.menuToggle.addEventListener('click', () => {
            this.menuToggle.classList.toggle('active');
            this.mobileMenu.classList.toggle('active');
            document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        const links = this.mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    }
    
    closeMobileMenu() {
        if (this.menuToggle) this.menuToggle.classList.remove('active');
        if (this.mobileMenu) this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Footer Component
class Footer {
    constructor() {
        this.footer = document.querySelector('.footer');
        this.init();
    }
    
    init() {
        this.createFooterContent();
    }
    
    createFooterContent() {
        // Footer is created in HTML, this can be used for dynamic updates
    }
    
    updateNewsletterCount(count) {
        const counter = this.footer?.querySelector('.newsletter-count');
        if (counter) {
            counter.textContent = count;
        }
    }
}

// Service Card Component
class ServiceCard {
    constructor(element) {
        this.element = element;
        this.icon = element.querySelector('.service-icon svg');
        this.title = element.querySelector('h4');
        this.description = element.querySelector('p');
        this.link = element.querySelector('a');
        this.init();
    }
    
    init() {
        this.element.addEventListener('mouseenter', () => this.onHover());
        this.element.addEventListener('mouseleave', () => this.onLeave());
        
        if (this.link) {
            this.link.addEventListener('click', (e) => this.onClick(e));
        }
    }
    
    onHover() {
        this.element.classList.add('hovered');
        if (this.icon) {
            this.icon.style.transform = 'scale(1.1)';
        }
    }
    
    onLeave() {
        this.element.classList.remove('hovered');
        if (this.icon) {
            this.icon.style.transform = 'scale(1)';
        }
    }
    
    onClick(e) {
        // Handle service card click
    }
}

// News Card Component
class NewsCard {
    constructor(element) {
        this.element = element;
        this.image = element.querySelector('.news-image img');
        this.category = element.querySelector('.news-category');
        this.title = element.querySelector('h4');
        this.date = element.querySelector('.news-date');
        this.excerpt = element.querySelector('.news-excerpt');
        this.link = element.querySelector('.read-more');
        this.init();
    }
    
    init() {
        this.element.addEventListener('mouseenter', () => this.onHover());
        this.element.addEventListener('mouseleave', () => this.onLeave());
        
        if (this.link) {
            this.link.addEventListener('click', (e) => this.onClick(e));
        }
    }
    
    onHover() {
        this.element.classList.add('hovered');
        if (this.image) {
            this.image.style.transform = 'scale(1.1)';
        }
    }
    
    onLeave() {
        this.element.classList.remove('hovered');
        if (this.image) {
            this.image.style.transform = 'scale(1)';
        }
    }
    
    onClick(e) {
        // Handle news card click
    }
    
    updateDate(dateString) {
        if (this.date) {
            const date = new Date(dateString);
            this.date.textContent = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}

// Contact Form Component
class ContactForm {
    constructor(element) {
        this.form = element;
        this.inputs = this.form.querySelectorAll('input, textarea, select');
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.init();
    }
    
    init() {
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('focus', () => this.clearError(input));
        });
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        const required = input.required;
        
        if (required && !value) {
            this.showError(input, 'This field is required');
            return false;
        }
        
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(input, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                this.showError(input, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }
    
    showError(input, message) {
        this.clearError(input);
        input.style.borderColor = '#e74c3c';
        
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = 'color: #e74c3c; font-size: 0.85rem; margin-top: 5px;';
        
        input.parentNode.appendChild(error);
    }
    
    clearError(input) {
        input.style.borderColor = '';
        const error = input.parentNode.querySelector('.field-error');
        if (error) error.remove();
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        let isValid = true;
        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                this.submitBtn.disabled = false;
                this.submitBtn.textContent = 'Send Message';
                this.form.reset();
                this.showSuccess('Thank you! Your message has been sent successfully.');
            }, 1500);
        }
    }
    
    showSuccess(message) {
        const notification = document.createElement('div');
        notification.className = 'form-success';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 20px 30px;
            background: #27ae60;
            color: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Modal Component
class Modal {
    constructor(element) {
        this.modal = element;
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.triggers = document.querySelectorAll(`[data-modal="${this.modal.id}"]`);
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', () => this.open());
        });
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }
    
    open() {
        this.modal.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = '';
    }
}

// Tabs Component
class Tabs {
    constructor(element) {
        this.container = element;
        this.tabs = this.container.querySelectorAll('.tab-btn');
        this.panels = this.container.querySelectorAll('.tab-panel');
        this.init();
    }
    
    init() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.switchTab(index));
        });
    }
    
    switchTab(index) {
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.panels.forEach(panel => panel.classList.remove('active'));
        
        this.tabs[index].classList.add('active');
        this.panels[index].classList.add('active');
    }
}

// Accordion Component
class Accordion {
    constructor(element) {
        this.container = element;
        this.items = this.container.querySelectorAll('.accordion-item');
        this.init();
    }
    
    init() {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all
                this.items.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = '0';
                });
                
                // Open clicked if was closed
                if (!isOpen) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }
}

// Slider Component
class Slider {
    constructor(element, options = {}) {
        this.container = element;
        this.slides = element.querySelectorAll('.slide');
        this.prevBtn = element.querySelector('.slider-prev');
        this.nextBtn = element.querySelector('.slider-next');
        this.dotsContainer = element.querySelector('.slider-dots');
        
        this.options = {
            autoplay: options.autoplay || true,
            interval: options.interval || 5000,
            ...options
        };
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.showSlide(0);
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => this.goTo(index));
            this.dotsContainer.appendChild(dot);
        });
    }
    
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        const dots = this.dotsContainer?.querySelectorAll('.slider-dot');
        dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.slideCount;
        this.showSlide(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.showSlide(prevIndex);
    }
    
    goTo(index) {
        this.showSlide(index);
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }
    
    startAutoplay() {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = setInterval(() => this.next(), this.options.interval);
    }
}

// Initialize Components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Header
    new Header();
    
    // Initialize Service Cards
    document.querySelectorAll('.service-card').forEach(card => {
        new ServiceCard(card);
    });
    
    // Initialize News Cards
    document.querySelectorAll('.news-card').forEach(card => {
        new NewsCard(card);
    });
    
    // Initialize Contact Form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        new ContactForm(contactForm);
    }
    
    // Initialize Modals
    document.querySelectorAll('.modal').forEach(modal => {
        new Modal(modal);
    });
    
    // Initialize Tabs
    document.querySelectorAll('.tabs-container').forEach(container => {
        new Tabs(container);
    });
    
    // Initialize Accordions
    document.querySelectorAll('.accordion').forEach(accordion => {
        new Accordion(accordion);
    });
    
    // Initialize Sliders
    document.querySelectorAll('.slider').forEach(slider => {
        new Slider(slider, {
            autoplay: true,
            interval: 5000
        });
    });
});

// Export for use
window.HuiruiComponents = {
    Header,
    ServiceCard,
    NewsCard,
    ContactForm,
    Modal,
    Tabs,
    Accordion,
    Slider
};
