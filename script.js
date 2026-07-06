// Preloader
const preloader = document.getElementById("preloader");

window.addEventListener("load", () => {
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add("hide");
        }
    }, 450);
});

// Mobile Menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("show");
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("show");
        }
    });
});

// Header Scroll Effect and Back to Top
const header = document.getElementById("header");
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else if (!document.body.classList.contains("profile-page")) {
            header.classList.remove("scrolled");
        }
    }

    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Typing Text Effect
const typingText = document.getElementById("typing-text");
const words = ["C#", "ASP.NET Core", "MVC Apps", "Web APIs", "SQL Server"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 65 : 115;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 420;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => revealObserver.observe(element));

// Skill Progress Animation
const progressBars = document.querySelectorAll(".progress");

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-width");
            entry.target.style.width = width + "%";
        }
    });
}, {
    threshold: 0.35
});

progressBars.forEach(bar => skillObserver.observe(bar));

// Project Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        projectCards.forEach(card => {
            const category = card.getAttribute("data-category");

            if (filterValue === "all" || filterValue === category) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

// Active Navigation Link on Scroll for index page sections
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 130;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    if (currentSection) {
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.remove("active");
            if (href === `index.html#${currentSection}` || href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }
});

// Dark Mode
const themeBtn = document.getElementById("theme-btn");
const savedTheme = localStorage.getItem("aspnet-portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "☀️";
}

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeBtn.textContent = "☀️";
            localStorage.setItem("aspnet-portfolio-theme", "dark");
        } else {
            themeBtn.textContent = "🌙";
            localStorage.setItem("aspnet-portfolio-theme", "light");
        }
    });
}

// Contact Form Validation
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        let isValid = true;

        if (name.value.trim().length < 3) {
            showError(name, "Name must be at least 3 characters");
            isValid = false;
        } else {
            showSuccess(name);
        }

        if (!validateEmail(email.value.trim())) {
            showError(email, "Enter a valid email address");
            isValid = false;
        } else {
            showSuccess(email);
        }

        if (subject.value.trim().length < 4) {
            showError(subject, "Subject must be at least 4 characters");
            isValid = false;
        } else {
            showSuccess(subject);
        }

        if (message.value.trim().length < 10) {
            showError(message, "Message must be at least 10 characters");
            isValid = false;
        } else {
            showSuccess(message);
        }

        if (isValid) {
            formStatus.textContent = "Message sent successfully!";
            contactForm.reset();

            document.querySelectorAll(".input-group").forEach(group => {
                group.classList.remove("success");
            });

            setTimeout(() => {
                formStatus.textContent = "";
            }, 3000);
        }
    });
}

function showError(input, message) {
    const inputGroup = input.parentElement;
    const small = inputGroup.querySelector("small");
    inputGroup.classList.add("error");
    inputGroup.classList.remove("success");
    small.textContent = message;
}

function showSuccess(input) {
    const inputGroup = input.parentElement;
    const small = inputGroup.querySelector("small");
    inputGroup.classList.add("success");
    inputGroup.classList.remove("error");
    small.textContent = "";
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Profile image preview on image page
const imageUpload = document.getElementById("image-upload");
const profilePreview = document.getElementById("profile-preview");

if (imageUpload && profilePreview) {
    imageUpload.addEventListener("change", () => {
        const file = imageUpload.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = event => {
            profilePreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}
