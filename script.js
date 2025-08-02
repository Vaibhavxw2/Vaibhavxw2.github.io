document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    const existingMessages = form.parentNode.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    try {
        const response = await fetch('https://formspree.io/f/xblkaldz', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <strong>Message Sent Successfully!</strong><br>
                Thanks for reaching out! I'll get back to you within 24 hours.
            `;
            form.parentNode.insertBefore(successDiv, form);
            successDiv.style.display = 'block';
            
            form.reset();
            
            setTimeout(() => {
                successDiv.style.transition = 'all 0.5s ease';
                successDiv.style.opacity = '0';
                successDiv.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (successDiv.parentNode) {
                        successDiv.remove();
                    }
                }, 500);
            }, 7000);
            
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Form submission failed');
        }
    } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Oops! Something went wrong.</strong><br>
            Please email me directly at <a href="mailto:kakashiii@outlook.in" style="color: #fff; text-decoration: underline;">kakashiii@outlook.in</a>
        `;
        form.parentNode.insertBefore(errorDiv, form);
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.transition = 'all 0.5s ease';
            errorDiv.style.opacity = '0';
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 500);
        }, 10000);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    }
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
});
