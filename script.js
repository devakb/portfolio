// Experience tabs functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tab content display
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    if (tabContents.length > 0) {
        // Show first tab content by default
        tabContents[0].classList.add('active');
        
        // Hide other tab contents
        for (let i = 1; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update tab content with animation
            tabContents.forEach((content, i) => {
                if (i === index) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and elements with animation
document.querySelectorAll('section, .project, .about-content, .experience-content').forEach(element => {
    // Make sure elements are visible by default
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const clonedNavLinks = navLinks.cloneNode(true);
        mobileMenu.appendChild(clonedNavLinks);
        
        // Add animation to mobile menu links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach((link, index) => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
            link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            link.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    nav.appendChild(mobileMenuBtn);
    document.body.appendChild(mobileMenu);
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Animate links when menu opens
        if (mobileMenu.classList.contains('active')) {
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                }, 100 + (index * 100));
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
};

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Update mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    } else {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenuBtn) mobileMenuBtn.remove();
        if (mobileMenu) mobileMenu.remove();
    }
});

// Add hover effect to project images
document.querySelectorAll('.project-image').forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.02)';
        image.style.transition = 'transform 0.3s ease';
    });
    
    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Cursor follower
document.addEventListener('DOMContentLoaded', () => {
    const cursorFollower = document.querySelector('.cursor-follower');
    const outerCircle = document.querySelector('.cursor-circle.outer');
    
    // Set initial sizes (half of current size)
    outerCircle.style.width = '1000px';
    outerCircle.style.height = '1000px';
    outerCircle.style.backgroundColor = 'rgba(100, 255, 218, 0.05)'; // Decreased opacity
    
    const middleCircle = outerCircle.querySelector('.cursor-circle.middle');
    middleCircle.style.width = '500px';
    middleCircle.style.height = '500px';
    middleCircle.style.backgroundColor = 'rgba(100, 255, 218, 0.07)'; // Further decreased opacity
    
    const innerCircle = outerCircle.querySelector('.cursor-circle.inner');
    innerCircle.style.width = '200px';
    innerCircle.style.height = '200px';
    innerCircle.style.backgroundColor = 'rgba(100, 255, 218, 0.3)'; // Decreased opacity
    
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animate() {
        // Faster movement to match cursor more closely
        circleX += (mouseX - circleX) * 0.3;
        circleY += (mouseY - circleY) * 0.3;
        outerCircle.style.left = `${circleX}px`;
        outerCircle.style.top = `${circleY}px`;
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tab-button, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            outerCircle.style.width = '1500px'; // Half of 3000px
            outerCircle.style.height = '1500px'; // Half of 3000px
            middleCircle.style.width = '750px'; // Half of 1500px
            middleCircle.style.height = '750px'; // Half of 1500px
            innerCircle.style.width = '300px'; // Half of 600px
            innerCircle.style.height = '300px'; // Half of 600px
        });
        
        element.addEventListener('mouseleave', () => {
            outerCircle.style.width = '1000px'; // Half of 2000px
            outerCircle.style.height = '1000px'; // Half of 2000px
            middleCircle.style.width = '500px'; // Half of 1000px
            middleCircle.style.height = '500px'; // Half of 1000px
            innerCircle.style.width = '200px'; // Half of 400px
            innerCircle.style.height = '200px'; // Half of 400px
        });
    });
}); 