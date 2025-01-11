// Select the elements
const mobileMenu = document.querySelector('.lg\\:hidden[role="dialog"]');
const navToggleButtons = document.querySelectorAll('#nav-toggle');

// Toggle function to show/hide the menu
const toggleMenu = () => {
  mobileMenu.classList.toggle('hidden');
};

// Add event listeners to both toggle buttons
navToggleButtons.forEach(button => {
  button.addEventListener('click', toggleMenu);
});

// Initially hide the mobile menu
mobileMenu.classList.add('hidden');
