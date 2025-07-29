document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });

        // Close nav when a link is clicked (for single-page navigation)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(l => l.style.animation = ''); // Reset animation
            });
        });
    }

    // --- Search Functionality (for menu pages) ---
    // This function will be called by onkeyup event in drinks-menu.html
    window.filterDrinks = function() {
        var input, filter, menuSections, ul, li, a, i, txtValue;
        input = document.getElementById('drinkSearch');
        if (!input) return; // Exit if search bar not found (e.g., on index.html)

        filter = input.value.toUpperCase();
        menuSections = document.getElementsByClassName('menu-section');

        for (let s = 0; s < menuSections.length; s++) {
            ul = menuSections[s].getElementsByTagName('ul')[0];
            if (!ul) continue; // Skip if no ul in section

            li = ul.getElementsByTagName('li');
            let sectionHasVisibleItems = false; // Flag to check if any item in the section is visible

            for (i = 0; i < li.length; i++) {
                // Target the strong tag for the drink name, or the li itself if no strong
                a = li[i].getElementsByTagName('strong')[0] || li[i];
                if (a) {
                    txtValue = a.textContent || a.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        li[i].style.display = "";
                        sectionHasVisibleItems = true;
                    } else {
                        li[i].style.display = "none";
                    }
                }
            }
            // Show or hide the whole menu-section based on if it contains any visible items
            if (sectionHasVisibleItems || filter === "") {
                menuSections[s].style.display = "";
            } else {
                menuSections[s].style.display = "none";
            }
        }
    };

    // This function will be called by onkeyup event in food-menu.html
    window.filterFood = function() {
        var input, filter, menuSections, ul, li, a, i, txtValue;
        input = document.getElementById('foodSearch');
        if (!input) return; // Exit if search bar not found

        filter = input.value.toUpperCase();
        menuSections = document.getElementsByClassName('menu-section');

        for (let s = 0; s < menuSections.length; s++) {
            ul = menuSections[s].getElementsByTagName('ul')[0];
            if (!ul) continue; // Skip if no ul in section

            li = ul.getElementsByTagName('li');
            let sectionHasVisibleItems = false;

            for (i = 0; i < li.length; i++) {
                // For food, items might have strong (e.g., "1/2 KG") or just be text.
                // We'll search the entire li text content.
                txtValue = li[i].textContent || li[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                    sectionHasVisibleItems = true;
                } else {
                    li[i].style.display = "none";
                }
            }
            if (sectionHasVisibleItems || filter === "") {
                menuSections[s].style.display = "";
            } else {
                menuSections[s].style.display = "none";
            }
        }
    };

    // --- Image Carousel Functionality for multiple carousels ---
    const allCarouselContainers = document.querySelectorAll('.carousel-container');

    allCarouselContainers.forEach(container => {
        const slides = container.querySelectorAll('.carousel-slide');
        const dots = container.querySelectorAll('.dot');
        const prevButton = container.querySelector('.carousel-prev');
        const nextButton = container.querySelector('.carousel-next');
        let currentSlide = 0;
        let slideInterval; // Variable to hold the interval ID for auto-swiping

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = 'none';
                if (dots[i]) {
                    dots[i].classList.remove('active');
                }
            });

            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            slides[currentSlide].style.display = 'block';
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        }

        function changeSlide(n) {
            resetAutoSwipe(); // Reset auto-swipe on manual navigation
            showSlide(currentSlide + n);
        }

        function startAutoSwipe() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 3000); // Change slide every 3 seconds
        }

        function resetAutoSwipe() {
            clearInterval(slideInterval); // Clear existing interval
            // Restart after a brief delay to allow user interaction to settle
            setTimeout(startAutoSwipe, 5000); // Restart after 5 seconds
        }

        // Event listeners for navigation buttons
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => changeSlide(-1));
            nextButton.addEventListener('click', () => changeSlide(1));
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                resetAutoSwipe(); // Reset auto-swipe on dot click
                showSlide(index);
            });
        });

        // Initial display of the first slide and start auto-swipe for each carousel
        if (slides.length > 0) {
            showSlide(currentSlide);
            startAutoSwipe();
        }
    });
});

// Keyframe animation for nav links
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes navLinkFade {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
}
`;
document.head.appendChild(styleSheet);