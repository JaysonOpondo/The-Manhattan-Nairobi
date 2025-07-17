document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

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

    // Close nav when a link is clicked (for smooth scrolling)
    // This will work for internal anchor links on index.html and also when navigating to other pages
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if burger menu is open before closing
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(item => item.style.animation = ''); // Reset animation
            }
        });
    });


    // --- Menu Tab Switching (Only active on pages with .menu-tab elements, e.g., drinks-menu.html) ---
    // Check if menuTabs exist on the current page before adding event listeners
    const menuTabs = document.querySelectorAll('.menu-tab');
    if (menuTabs.length > 0) { // Only run this if menu tabs are present
        const menuContents = document.querySelectorAll('.menu-content');

        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active from all tabs and contents
                menuTabs.forEach(item => item.classList.remove('active'));
                menuContents.forEach(item => item.style.display = 'none');

                // Add active to clicked tab
                tab.classList.add('active');

                // Show corresponding content
                const targetCategory = tab.dataset.category;
                document.getElementById(`${targetCategory}-menu`).style.display = 'block';
            });
        });

        // Optional: If you want a specific tab to be active on page load (e.g., if linking to #spirits)
        // This is more advanced and would require checking the URL hash.
    }


    // --- Simple Form Submission (Frontend only) ---
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            alert('Reservation request sent! We will contact you shortly to confirm.');

            // Clear the form
            reservationForm.reset();
        });
    }

    // You might add more JS later, e.g., image carousels, modals, animations, etc.
});