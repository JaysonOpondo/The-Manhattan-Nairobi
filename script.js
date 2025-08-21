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
            if (!ul) continue;

            li = ul.getElementsByTagName('li');
            let sectionHasVisibleItems = false;

            for (i = 0; i < li.length; i++) {
                // Target the strong tag for the dish name, or the li itself if no strong
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
            if (sectionHasVisibleItems || filter === "") {
                menuSections[s].style.display = "";
            } else {
                menuSections[s].style.display = "none";
            }
        }
    };

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            // Show the button when the user scrolls down 200px
            if (window.scrollY > 200) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // --- Image Carousel (Gallery) ---
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        let currentSlide = 0;
        let slideInterval;
        const slides = carousel.querySelectorAll('.carousel-slide img, .carousel-slide video');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = 'none';
                if (slides[i].tagName === 'VIDEO') {
                    slides[i].pause();
                }
            });
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].style.display = 'block';
            dots[currentSlide].classList.add('active');

            // Autoplay the video if the current slide is a video
            if (slides[currentSlide].tagName === 'VIDEO') {
                slides[currentSlide].play();
            }
        }

        function changeSlide(n) {
            resetAutoSwipe();
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

    // --- Gallery Modal Functionality ---
    let galleryItems = [];
    let currentGalleryIndex = 0;
    let galleryAutoScrollInterval = null;
    let galleryVideoEndedListener = null;

    window.openModal = function(img) {
        // Get all gallery items in order
        galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
        currentGalleryIndex = galleryItems.indexOf(img);

        var modal = document.getElementById("galleryModal");
        var modalImg = document.getElementById("modalImg");
        var modalVideo = document.getElementById("modalVideo");
        var captionText = document.getElementById("caption");
        var videoSrc = img.getAttribute('data-video');

        modal.style.display = "block";
        captionText.innerHTML = img.alt;

        // Remove previous video ended listener if any
        if (galleryVideoEndedListener) {
            modalVideo.removeEventListener('ended', galleryVideoEndedListener);
            galleryVideoEndedListener = null;
        }

        if (videoSrc) {
            modalImg.style.display = "none";
            modalVideo.style.display = "block";
            modalVideo.src = videoSrc;
            modalVideo.load();
            modalVideo.play();

            // Only auto-scroll after video ends
            clearInterval(galleryAutoScrollInterval);
            galleryVideoEndedListener = function() {
                showNextGalleryItem();
            };
            modalVideo.addEventListener('ended', galleryVideoEndedListener);
        } else {
            modalVideo.pause();
            modalVideo.style.display = "none";
            modalImg.style.display = "block";
            modalImg.src = img.src;

            // Auto-scroll for images only
            clearInterval(galleryAutoScrollInterval);
            galleryAutoScrollInterval = setInterval(() => {
                showNextGalleryItem();
            }, 4000); // Change every 4 seconds
        }
    };

    function showNextGalleryItem() {
        if (!galleryItems.length) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        galleryItems[currentGalleryIndex].click();
    }

    window.closeModal = function() {
        var modal = document.getElementById("galleryModal");
        var modalVideo = document.getElementById("modalVideo");
        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.currentTime = 0;
        clearInterval(galleryAutoScrollInterval);
        if (galleryVideoEndedListener) {
            modalVideo.removeEventListener('ended', galleryVideoEndedListener);
            galleryVideoEndedListener = null;
        }
    };

    var closeBtn = document.querySelector('.gallery-modal .close');
    if (closeBtn) {
        closeBtn.onclick = function(event) {
            event.stopPropagation();
            window.closeModal();
        };
    }
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
}`;
document.head.appendChild(styleSheet);