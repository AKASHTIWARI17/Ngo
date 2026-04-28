// ── Mobile Menu Toggle ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('show');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('show');
    });
});

// ── Navbar Scroll Effect ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Active Nav Link on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveLink);

// ── Scroll Fade-Up Animation ──
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ── Counter Animation ──
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + suffix;
            }
        };
        updateCounter();
    });
}

const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });
statsObserver.observe(statsSection);

// ── Donate Modal ──
const donateModal = document.getElementById('donateModal');
const donateBtns = document.querySelectorAll('[data-donate]');
const closeModal = document.getElementById('closeModal');

donateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        donateModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    donateModal.classList.remove('show');
    document.body.style.overflow = '';
});

donateModal.addEventListener('click', (e) => {
    if (e.target === donateModal) {
        donateModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// ── Amount Selection ──
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmount = document.getElementById('customAmount');

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        customAmount.value = '';
    });
});

customAmount.addEventListener('focus', () => {
    amountBtns.forEach(b => b.classList.remove('selected'));
});

// ── Volunteer Form ──
const volunteerForm = document.getElementById('volunteerForm');
volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = volunteerForm.querySelector('input').value;
    if (email) {
        alert('Thank you for volunteering! We will contact you at: ' + email);
        volunteerForm.reset();
    }
});

// ── Contact Form ──
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// ── Donate Form ──
const donateForm = document.getElementById('donateForm');
donateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selected = document.querySelector('.amount-btn.selected');
    const custom = customAmount.value;
    const amount = custom || (selected ? selected.textContent : '');
    if (amount) {
        alert('Thank you for your generous donation of ' + amount + '! Your support changes lives.');
        donateModal.classList.remove('show');
        document.body.style.overflow = '';
        donateForm.reset();
        amountBtns.forEach(b => b.classList.remove('selected'));
    } else {
        alert('Please select or enter a donation amount.');
    }
});

// ── Progress Bar Animation ──
const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.getAttribute('data-width');
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    bar.style.width = '0%';
    progressObserver.observe(bar);
});
